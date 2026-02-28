"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { DealForm } from "./deal-form";
import { deleteDeal } from "@/lib/actions/deals";
import { DEAL_STAGE_COLOR } from "@/lib/constants";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Deal, DealStage } from "@/lib/data/types";

interface PipelineTableProps {
  deals: Deal[];
}

export function PipelineTable({ deals }: PipelineTableProps) {
  const [stageFilter, setStageFilter] = useState<DealStage | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | undefined>();
  const [isPending, startTransition] = useTransition();

  const filtered = stageFilter === "all"
    ? deals
    : deals.filter((d) => d.stage === stageFilter);

  const stages: (DealStage | "all")[] = [
    "all", "新規", "提案中", "面談調整", "面談済", "内定", "成約", "失注",
  ];

  function openCreate() {
    setEditingDeal(undefined);
    setModalOpen(true);
  }

  function openEdit(deal: Deal) {
    setEditingDeal(deal);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("この商談を削除しますか？")) return;
    startTransition(async () => {
      await deleteDeal(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-wrap gap-1.5">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                stageFilter === s
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              {s === "all" ? "すべて" : s}
              {" "}
              ({s === "all" ? deals.length : deals.filter((d) => d.stage === s).length})
            </button>
          ))}
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-blue-700 shadow-sm shrink-0 ml-3"
        >
          <Plus className="h-3.5 w-3.5" />
          新規追加
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>商談名</TableHead>
            <TableHead>クライアント</TableHead>
            <TableHead>ステージ</TableHead>
            <TableHead className="text-right">想定単価（万円）</TableHead>
            <TableHead>営業担当</TableHead>
            <TableHead>作成日</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell className="font-medium">{deal.name}</TableCell>
              <TableCell>{deal.client}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${DEAL_STAGE_COLOR[deal.stage]}`}
                >
                  {deal.stage}
                </span>
              </TableCell>
              <TableCell className="text-right">{deal.expectedRate}</TableCell>
              <TableCell>{deal.salesPerson}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {deal.createdAt}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => openEdit(deal)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(deal.id)}
                    disabled={isPending}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDeal ? "商談を編集" : "商談を追加"}
      >
        <DealForm
          deal={editingDeal}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
