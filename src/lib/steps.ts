import { getSteps } from "@/lib/googleHealth";

export type StepsPayload = {
  goal: number;
  points: Array<{ date: string; steps: number }>;
  updatedAt: string;
};

export function getGoal(): number {
  const raw = (import.meta.env as Record<string, string | undefined>).PUBLIC_STEP_GOAL;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 10_000;
  }
  return parsed;
}

export async function getStepsPayload(): Promise<StepsPayload> {
  const { points, updatedAt } = await getSteps(30);
  return {
    goal: getGoal(),
    points,
    updatedAt,
  };
}
