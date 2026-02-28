"use client";

import { useState, useTransition } from "react";
import { createProject, updateProject } from "@/lib/actions/projects";
import type { Project } from "@/lib/data/types";

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(project?.name ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [requiredSkills, setRequiredSkills] = useState(project?.requiredSkills.join(", ") ?? "");
  const [rateMin, setRateMin] = useState(project?.rateMin ?? 0);
  const [rateMax, setRateMax] = useState(project?.rateMax ?? 0);
  const [status, setStatus] = useState(project?.status ?? "商談中");
  const [startDate, setStartDate] = useState(project?.startDate ?? "");
  const [endDate, setEndDate] = useState(project?.endDate ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      name,
      client,
      requiredSkills: requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
      rateMin: Number(rateMin),
      rateMax: Number(rateMax),
      status,
      startDate,
      endDate: endDate || null,
    };

    startTransition(async () => {
      if (project) {
        await updateProject(project.id, input);
      } else {
        await createProject(input);
      }
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">案件名</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">クライアント</label>
        <input
          type="text"
          required
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">必要スキル（カンマ区切り）</label>
        <input
          type="text"
          required
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          placeholder="React, TypeScript, Go"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">最低単価（万円）</label>
          <input
            type="number"
            min={0}
            required
            value={rateMin}
            onChange={(e) => setRateMin(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">最高単価（万円）</label>
          <input
            type="number"
            min={0}
            required
            value={rateMax}
            onChange={(e) => setRateMax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">ステータス</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="商談中">商談中</option>
          <option value="契約中">契約中</option>
          <option value="終了">終了</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">開始日</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">終了日</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
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
          {isPending ? "保存中..." : project ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
