"use client";

import { useState, useTransition } from "react";
import { createContract, updateContract } from "@/lib/actions/contracts";
import type { Contract, Engineer, Project } from "@/lib/data/types";

interface ContractFormProps {
  contract?: Contract;
  engineers: Engineer[];
  projects: Project[];
  onClose: () => void;
}

export function ContractForm({ contract, engineers, projects, onClose }: ContractFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(contract?.name ?? "");
  const [engineerId, setEngineerId] = useState(contract?.engineerId ?? "");
  const [projectId, setProjectId] = useState(contract?.projectId ?? "");
  const [rate, setRate] = useState(contract?.rate ?? 0);
  const [startDate, setStartDate] = useState(contract?.startDate ?? "");
  const [endDate, setEndDate] = useState(contract?.endDate ?? "");
  const [status, setStatus] = useState(contract?.status ?? "予定");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      name,
      engineerId,
      projectId,
      rate: Number(rate),
      startDate,
      endDate: endDate || null,
      status,
    };

    startTransition(async () => {
      if (contract) {
        await updateContract(contract.id, input);
      } else {
        await createContract(input);
      }
      onClose();
    });
  }

  const activeEngineers = engineers.filter((e) => e.status !== "退職");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">契約名</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">エンジニア</label>
        <select
          required
          value={engineerId}
          onChange={(e) => setEngineerId(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">選択してください</option>
          {activeEngineers.map((eng) => (
            <option key={eng.id} value={eng.id}>
              {eng.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">案件</label>
        <select
          required
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">選択してください</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">単価（万円/月）</label>
        <input
          type="number"
          min={0}
          required
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
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

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">ステータス</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="予定">予定</option>
          <option value="契約中">契約中</option>
          <option value="終了">終了</option>
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
          {isPending ? "保存中..." : contract ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
