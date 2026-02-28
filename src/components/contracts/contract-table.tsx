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
import { ContractForm } from "./contract-form";
import { deleteContract } from "@/lib/actions/contracts";
import { CONTRACT_STATUS_COLOR } from "@/lib/constants";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Contract, ContractStatus, Engineer, Project } from "@/lib/data/types";

interface ContractTableProps {
  contracts: Contract[];
  engineers: Engineer[];
  projects: Project[];
}

export function ContractTable({ contracts, engineers, projects }: ContractTableProps) {
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | undefined>();
  const [isPending, startTransition] = useTransition();

  const engineerMap = new Map(engineers.map((e) => [e.id, e]));
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  const filtered = statusFilter === "all"
    ? contracts
    : contracts.filter((c) => c.status === statusFilter);

  const statuses: (ContractStatus | "all")[] = ["all", "契約中", "終了", "予定"];

  function openCreate() {
    setEditingContract(undefined);
    setModalOpen(true);
  }

  function openEdit(contract: Contract) {
    setEditingContract(contract);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("この契約を削除しますか？")) return;
    startTransition(async () => {
      await deleteContract(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                statusFilter === s
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              {s === "all" ? "すべて" : s}
              {" "}
              ({s === "all" ? contracts.length : contracts.filter((c) => c.status === s).length})
            </button>
          ))}
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-blue-700 shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          新規追加
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>契約名</TableHead>
            <TableHead>エンジニア</TableHead>
            <TableHead>案件</TableHead>
            <TableHead className="text-right">単価（万円）</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>期間</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((contract) => {
            const engineer = engineerMap.get(contract.engineerId);
            const project = projectMap.get(contract.projectId);
            return (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell>{engineer?.name ?? "-"}</TableCell>
                <TableCell>{project?.name ?? "-"}</TableCell>
                <TableCell className="text-right">{contract.rate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${CONTRACT_STATUS_COLOR[contract.status]}`}
                  >
                    {contract.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {contract.startDate} 〜 {contract.endDate || "未定"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => openEdit(contract)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(contract.id)}
                      disabled={isPending}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingContract ? "契約を編集" : "契約を追加"}
      >
        <ContractForm
          contract={editingContract}
          engineers={engineers}
          projects={projects}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
