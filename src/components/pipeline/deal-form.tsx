"use client";

import { useState, useTransition } from "react";
import { createDeal, updateDeal } from "@/lib/actions/deals";
import type { Deal } from "@/lib/data/types";

interface DealFormProps {
  deal?: Deal;
  onClose: () => void;
}

export function DealForm({ deal, onClose }: DealFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(deal?.name ?? "");
  const [client, setClient] = useState(deal?.client ?? "");
  const [stage, setStage] = useState(deal?.stage ?? "新規");
  const [expectedRate, setExpectedRate] = useState(deal?.expectedRate ?? 0);
  const [salesPerson, setSalesPerson] = useState(deal?.salesPerson ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      name,
      client,
      stage,
      expectedRate: Number(expectedRate),
      salesPerson,
    };

    startTransition(async () => {
      if (deal) {
        await updateDeal(deal.id, input);
      } else {
        await createDeal(input);
      }
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">商談名</label>
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
        <label className="block text-sm font-medium text-slate-700 mb-1">ステージ</label>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as typeof stage)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="新規">新規</option>
          <option value="提案中">提案中</option>
          <option value="面談調整">面談調整</option>
          <option value="面談済">面談済</option>
          <option value="内定">内定</option>
          <option value="成約">成約</option>
          <option value="失注">失注</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">想定単価（万円）</label>
        <input
          type="number"
          min={0}
          required
          value={expectedRate}
          onChange={(e) => setExpectedRate(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">営業担当</label>
        <input
          type="text"
          required
          value={salesPerson}
          onChange={(e) => setSalesPerson(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
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
          {isPending ? "保存中..." : deal ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
