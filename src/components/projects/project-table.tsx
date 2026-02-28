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
import { ProjectForm } from "./project-form";
import { deleteProject } from "@/lib/actions/projects";
import { PROJECT_STATUS_COLOR } from "@/lib/constants";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Project, ProjectStatus, Contract } from "@/lib/data/types";

interface ProjectTableProps {
  projects: Project[];
  contracts: Contract[];
}

export function ProjectTable({ projects, contracts }: ProjectTableProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isPending, startTransition] = useTransition();

  const filtered = statusFilter === "all"
    ? projects
    : projects.filter((p) => p.status === statusFilter);

  const statuses: (ProjectStatus | "all")[] = ["all", "契約中", "商談中", "終了"];

  // 案件ごとのアサイン人数を計算
  const assignCount = new Map<string, number>();
  for (const c of contracts) {
    if (c.status === "契約中") {
      assignCount.set(c.projectId, (assignCount.get(c.projectId) || 0) + 1);
    }
  }

  function openCreate() {
    setEditingProject(undefined);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    if (!confirm("この案件を削除しますか？")) return;
    startTransition(async () => {
      await deleteProject(id);
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
              ({s === "all" ? projects.length : projects.filter((p) => p.status === s).length})
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
            <TableHead>案件名</TableHead>
            <TableHead>クライアント</TableHead>
            <TableHead>必要スキル</TableHead>
            <TableHead>単価レンジ</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead className="text-right">アサイン人数</TableHead>
            <TableHead>期間</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {project.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {project.rateMin}〜{project.rateMax}万
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${PROJECT_STATUS_COLOR[project.status]}`}
                >
                  {project.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {assignCount.get(project.id) || 0}名
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.startDate} 〜 {project.endDate || "未定"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => openEdit(project)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
        title={editingProject ? "案件を編集" : "案件を追加"}
      >
        <ProjectForm
          project={editingProject}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
