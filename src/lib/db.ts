import fs from "fs";
import path from "path";
import { supabase } from "./supabase";

export interface LeadRecord {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  age: string;
  gender: string;
  fitnessGoal: string;
  preferredTime: string;
  membershipPlan: string;
  agreeToTerms: boolean;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "youthgym_leads.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

export async function saveLead(data: Omit<LeadRecord, "id" | "createdAt">): Promise<LeadRecord> {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `REG-${dateStr}-${randomSuffix}`;
  const createdAt = new Date().toISOString();

  const record: LeadRecord = {
    id,
    ...data,
    createdAt,
  };

  // 1. Store in Local Database (data/youthgym_leads.json)
  try {
    ensureDirectoryExists();
    const fileData = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads: LeadRecord[] = JSON.parse(fileData || "[]");
    leads.unshift(record);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error("Local JSON database save error:", err);
  }

  // 2. Store in Supabase (`youthgym_leads` table for gym software)
  try {
    const { error } = await supabase.from("youthgym_leads").insert([
      {
        registration_id: record.id,
        full_name: record.fullName,
        mobile: record.mobile,
        email: record.email || null,
        age_group: record.age,
        gender: record.gender,
        fitness_goal: record.fitnessGoal,
        preferred_time: record.preferredTime,
        membership_plan: record.membershipPlan,
        agree_to_terms: record.agreeToTerms,
        created_at: record.createdAt,
      },
    ]);

    if (error) {
      console.warn("Supabase insert warning (table 'youthgym_leads' might need creation in Supabase SQL editor):", error.message);
    } else {
      console.log("Successfully stored lead in Supabase table 'youthgym_leads':", record.id);
    }
  } catch (err) {
    console.error("Supabase integration error:", err);
  }

  // 3. Post to Google Sheets API / Webhook (if configured)
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      console.log("Successfully synced lead to Google Sheets webhook.");
    } catch (err) {
      console.error("Google Sheets webhook error:", err);
    }
  }

  return record;
}

export async function getLeads(): Promise<LeadRecord[]> {
  // Try fetching from Supabase `youthgym_leads` table first
  try {
    const { data, error } = await supabase
      .from("youthgym_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((item) => ({
        id: item.registration_id || item.id,
        fullName: item.full_name,
        mobile: item.mobile,
        email: item.email || "",
        age: item.age_group,
        gender: item.gender,
        fitnessGoal: item.fitness_goal,
        preferredTime: item.preferred_time,
        membershipPlan: item.membership_plan,
        agreeToTerms: item.agree_to_terms,
        createdAt: item.created_at,
      }));
    }
  } catch (err) {
    console.error("Supabase fetch error, falling back to local file:", err);
  }

  // Fallback to local file database
  try {
    ensureDirectoryExists();
    const fileData = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(fileData || "[]");
  } catch (err) {
    console.error("Local JSON database read error:", err);
    return [];
  }
}
