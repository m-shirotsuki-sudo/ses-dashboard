"use client";

import { useState, useTransition } from "react";
import { createEngineer, updateEngineer } from "@/lib/actions/engineers";
import type { Engineer, Project } from "@/lib/data/types";

interface EngineerFormProps {
  engineer?: Engineer;
  projects: Project[];
  onClose: () => void;
}

export function EngineerForm({ engineer, projects, onClose }: EngineerFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(engineer?.name ?? "");
  const [skills, setSkills] = useState(engineer?.skills.join(", ") ?? "");
  const [status, setStatus] = useState(engineer?.status ?? "待機中");
  const [currentRate, setCurrentRate] = useState(engineer?.currentRate ?? 0);
  const [currentProjectId, setCurrentProjectId] = useState(engineer?.currentProjectId ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      name,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      status,
      currentRate: Number(currentRate),
      currentProjectId: currentProjectId || null,
    };

    startTransition(async () => {
      if (engineer) {
        await updateEngineer(engineer.id, input);
      } else {
        await createEngineer(input);
      }
      onClose();
    });
  }

  const activeProjects = projects.filter((p) => p.status === "契約中");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">名前</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">スキル（カンマ区切り）</label>
        <input
          type="text"
          required
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, TypeScript, Next.js"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">ステータス</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="稼働中">稼働中</option>
          <option value="待機中">待機中</option>
          <option value="退職">退職</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">現単価（万円/月）</label>
        <input
          type="number"
          min={0}
          value={currentRate}
          onChange={(e) => setCurrentRate(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">現案件</label>
        <select
          value={currentProjectId}
          onChange={(e) => setCurrentProjectId(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">なし</option>
          {activeProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "保存中..." : engineer ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
