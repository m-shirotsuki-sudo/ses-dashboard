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
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { EngineerForm } from "./engineer-form";
import { deleteEngineer } from "@/lib/actions/engineers";
import { ENGINEER_STATUS_COLOR } from "@/lib/constants";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Engineer, EngineerStatus, Project } from "@/lib/data/types";

interface EngineerTableProps {
  engineers: Engineer[];
  projects: Project[];
}

export function EngineerTable({ engineers, projects }: EngineerTableProps) {
  const [statusFilter, setStatusFilter] = useState<EngineerStatus | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEngineer, setEditingEngineer] = useState<Engineer | undefined>();
  const [isPending, startTransition] = useTransition();

  const projectMap = new Map(projects.map((p) => [p.id, p]));

  const filtered = statusFilter === "all"
    ? engineers
    : engineers.filter((e) => e.status === statusFilter);

  const statuses: (EngineerStatus | "all")[] = ["all", "稼働中", "待機中", "退職"];

  function openCreate() {
    setEditingEngineer(undefined);
    setModalOpen(true);
  }

  function openEdit(engineer: Engineer) {
    setEditingEngineer(engineer);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("このエンジニアを削除しますか？")) return;
    startTransition(async () => {
      await deleteEngineer(id);
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
              ({s === "all" ? engineers.length : engineers.filter((e) => e.status === s).length})
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
            <TableHead>名前</TableHead>
            <TableHead>スキル</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead className="text-right">現単価（万円）</TableHead>
            <TableHead>現案件</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((eng) => {
            const project = eng.currentProjectId
              ? projectMap.get(eng.currentProjectId)
              : null;
            return (
              <TableRow key={eng.id}>
                <TableCell className="font-medium">{eng.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {eng.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${ENGINEER_STATUS_COLOR[eng.status]}`}
                  >
                    {eng.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {eng.currentRate > 0 ? eng.currentRate : "-"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {project ? project.name : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => openEdit(eng)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(eng.id)}
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
        title={editingEngineer ? "エンジニアを編集" : "エンジニアを追加"}
      >
        <EngineerForm
          engineer={editingEngineer}
          projects={projects}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
