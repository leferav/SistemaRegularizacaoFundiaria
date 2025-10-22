import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line, Legend, Cell } from "recharts";
import { Camera, FileDown, FileSpreadsheet, LogOut, MapPin, Plus, Save, Search, Users, House, FileText, Layers, Images, ChartBar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------
// Helpers + Mock Data
// -----------------------------
const kpis = {
  nucleos: 8,
  lotesVisitados: 126,
  dossiesConcluidos: 74,
};

const lotesPorStatus = [
  { status: "Pendente", qtde: 42 },
  { status: "Em andamento", qtde: 58 },
  { status: "Concluído", qtde: 26 },
];

const tiposPosse = [
  { name: "Própria", value: 45 },
  { name: "Cedida", value: 25 },
  { name: "Alugada", value: 30 },
];

const evolucaoVisitas = [
  { mes: "Jan", visitas: 10 },
  { mes: "Fev", visitas: 16 },
  { mes: "Mar", visitas: 22 },
  { mes: "Abr", visitas: 28 },
  { mes: "Mai", visitas: 31 },
  { mes: "Jun", visitas: 19 },
];

const cores = ["#8884d8", "#82ca9d", "#ffc658", "#a0e0ff", "#ff8a80", "#dcedc8"]; // usaremos apenas no Pie para diferenciar fatias

function Kpi({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 rounded-2xl bg-muted"><Icon className="h-6 w-6" /></div>
        <div>
          <div className="text-2xl font-semibold leading-none">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Pages
// -----------------------------
function Login({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-background to-muted/30 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sistema de Regularização Fundiária</CardTitle>
          <CardDescription>Acesse para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>E‑mail</Label>
            <Input type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Senha</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={onSuccess}>Entrar</Button>
            <Button variant="outline" className="flex-1">Cadastrar</Button>
          </div>
          <Button variant="link" className="px-0">Esqueci minha senha</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Dashboard({ go }: { go: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Kpi icon={Layers} label="Núcleos cadastrados" value={kpis.nucleos} />
        <Kpi icon={Users} label="Lotes visitados" value={kpis.lotesVisitados} />
        <Kpi icon={FileText} label="Dossiês concluídos" value={`${kpis.dossiesConcluidos}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><ChartBar className="h-5 w-5" /> Situação dos Lotes</CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lotesPorStatus}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qtde" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><House className="h-5 w-5" /> Tipos de Posse</CardTitle>
            <CardDescription>Composição por posse</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tiposPosse} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {tiposPosse.map((_, i) => (
                    <Cell key={i} fill={cores[i % cores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-7 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Evolução das Visitas</CardTitle>
            <CardDescription>Últimos meses</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucaoVisitas}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitas" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Mapa dos Núcleos</CardTitle>
            <CardDescription>Área de demonstração (mock)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border bg-muted/30 h-64 grid place-items-center text-muted-foreground">
              <div className="text-center">
                <div className="text-sm">Mapa interativo (ex.: Leaflet/Google Maps)</div>
                <div className="text-xs">Protótipo: marcador de exemplo — Bairro Centro</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">Centro</Badge>
              <Badge variant="outline">Oeste</Badge>
              <Badge variant="outline">Leste</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button onClick={() => go("nucleo")}><Plus className="mr-2 h-4 w-4" /> Novo Núcleo</Button>
        <Button variant="secondary" onClick={() => go("lote")}><Plus className="mr-2 h-4 w-4" /> Novo Lote</Button>
        <Button variant="outline" onClick={() => go("captura")}><Camera className="mr-2 h-4 w-4" /> Capturar Foto</Button>
        <Button variant="outline" onClick={() => go("relatorios")}><FileText className="mr-2 h-4 w-4" /> Relatórios</Button>
      </div>
    </div>
  );
}

function CadastroNucleo({ onSaved }: { onSaved: () => void }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Cadastro de Núcleo</CardTitle>
        <CardDescription>Registre informações básicas do núcleo urbano</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome do Núcleo</Label>
          <Input placeholder="Ex.: Bairro Nova Esperança" />
        </div>
        <div className="space-y-2">
          <Label>Código do Núcleo</Label>
          <Input placeholder="Ex.: NE-001" />
        </div>
        <div className="space-y-2">
          <Label>Bairro / Região</Label>
          <Input placeholder="Ex.: Zona Oeste" />
        </div>
        <div className="space-y-2">
          <Label>Coordenadas GPS</Label>
          <Input placeholder="-18.627, -48.704 (auto ou manual)" />
        </div>
        <div className="md:col-span-2">
          <Label>Observações</Label>
          <Textarea placeholder="Notas gerais do núcleo" />
        </div>
        <div className="md:col-span-2 flex gap-3 pt-2">
          <Button onClick={onSaved}><Save className="mr-2 h-4 w-4" /> Salvar Núcleo</Button>
          <Button variant="outline">Cancelar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CadastroLote({ onBack }: { onBack: () => void }) {
  const [membros, setMembros] = useState<any[]>([]);

  const addMembro = () => setMembros((m) => [...m, { nome: "", parentesco: "", idade: "", escolaridade: "", ocupacao: "" }]);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Cadastro de Lote / Imóvel</CardTitle>
        <CardDescription>Preencha as informações do lote</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="identificacao" className="space-y-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="identificacao">Identificação</TabsTrigger>
            <TabsTrigger value="responsavel">Responsável</TabsTrigger>
            <TabsTrigger value="familia">Composição Familiar</TabsTrigger>
            <TabsTrigger value="ocupacao">Ocupação e Imóvel</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="identificacao" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>Código do Lote</Label><Input placeholder="LT-0001" /></div>
              <div className="space-y-2"><Label>Coordenadas GPS</Label><Input placeholder="-18.627, -48.704" /></div>
              <div className="md:col-span-2 space-y-2"><Label>Endereço</Label><Input placeholder="Rua X, nº Y, Bairro Z" /></div>
              <div className="space-y-2 md:col-span-2">
                <Label>Foto Frontal</Label>
                <Input type="file" accept="image/*" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="responsavel" className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Nome completo</Label><Input /></div>
            <div className="space-y-2"><Label>Data de nascimento</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>RG / CPF</Label><Input placeholder="000.000.000-00" /></div>
            <div className="space-y-2"><Label>Telefone / E‑mail</Label><Input placeholder="(34) 9 xxxx‑xxxx / email@dominio" /></div>
          </TabsContent>

          <TabsContent value="familia" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Membros</div>
                <div className="text-sm text-muted-foreground">Adicione os moradores do lote</div>
              </div>
              <Button size="sm" onClick={addMembro}><Plus className="mr-2 h-4 w-4" /> Adicionar membro</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Parentesco</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Escolaridade</TableHead>
                  <TableHead>Ocupação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membros.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Nenhum membro adicionado</TableCell></TableRow>
                ) : (
                  membros.map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Input placeholder="Nome" /></TableCell>
                      <TableCell><Input placeholder="Parentesco" /></TableCell>
                      <TableCell className="w-24"><Input placeholder="Idade" /></TableCell>
                      <TableCell><Input placeholder="Escolaridade" /></TableCell>
                      <TableCell><Input placeholder="Ocupação" /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="ocupacao" className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Tempo de ocupação (anos)</Label><Input type="number" min={0} /></div>
            <div className="space-y-2">
              <Label>Tipo de posse</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="propria">Própria</SelectItem>
                  <SelectItem value="cedida">Cedida</SelectItem>
                  <SelectItem value="alugada">Alugada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Tipo de construção</Label><Input placeholder="Alvenaria, madeira, mista..." /></div>
            <div className="space-y-2">
              <Label>Acesso a serviços</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2"><Checkbox id="agua" /><Label htmlFor="agua">Água</Label></div>
                <div className="flex items-center gap-2"><Checkbox id="energia" /><Label htmlFor="energia">Energia</Label></div>
                <div className="flex items-center gap-2"><Checkbox id="saneamento" /><Label htmlFor="saneamento">Saneamento</Label></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>RG</Label><Input type="file" /></div>
              <div className="space-y-2"><Label>CPF</Label><Input type="file" /></div>
              <div className="space-y-2"><Label>Comprovante de residência</Label><Input type="file" /></div>
              <div className="space-y-2"><Label>Declaração de posse</Label><Input type="file" /></div>
              <div className="space-y-2 md:col-span-2"><Label>Outros</Label><Input type="file" multiple /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button><FileText className="mr-2 h-4 w-4" /> Gerar Dossiê PDF (mock)</Button>
              <Button variant="outline" onClick={onBack}>Voltar</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function CapturaFoto({ onSaved }: { onSaved: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    const enableCam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setHasCamera(true);
        }
      } catch (e) {
        setHasCamera(false);
      }
    };
    enableCam();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    }
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const w = videoRef.current.videoWidth;
    const h = videoRef.current.videoHeight;
    const canvas = canvasRef.current;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, w, h);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Captura Fotográfica</CardTitle>
        <CardDescription>Use sua câmera para registrar imagens do lote</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4 items-start">
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border">
            {hasCamera ? (
              <video ref={videoRef} className="w-full aspect-video" />
            ) : (
              <div className="w-full aspect-video grid place-items-center text-muted-foreground bg-muted/30">Câmera não disponível (mock)</div>
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleCapture}><Camera className="mr-2 h-4 w-4" /> Capturar Foto</Button>
            <Button variant="outline" onClick={onSaved}><Save className="mr-2 h-4 w-4" /> Salvar com código do lote</Button>
          </div>
        </div>
        <div>
          <Label>Pré‑visualização</Label>
          <canvas ref={canvasRef} className="mt-2 w-full border rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

function Relatorios() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Relatório por Núcleo</CardTitle>
          <CardDescription>Lista de lotes, documentos e fotos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Pesquisar núcleo..." />
            <Button variant="secondary"><Search className="h-4 w-4 mr-2" /> Filtrar</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Núcleo</TableHead>
                <TableHead>Lotes</TableHead>
                <TableHead>Dossiês</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nova Esperança</TableCell>
                <TableCell>38</TableCell>
                <TableCell>22</TableCell>
                <TableCell><Badge variant="outline">Em andamento</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>São José</TableCell>
                <TableCell>17</TableCell>
                <TableCell>15</TableCell>
                <TableCell><Badge>Concluído</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex gap-2">
            <Button><FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Excel</Button>
            <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Gerar PDF</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Relatório de Impacto Social</CardTitle>
          <CardDescription>Famílias beneficiadas e evolução</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolucaoVisitas}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitas" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// -----------------------------
// Shell + Router (simple state)
// -----------------------------
export default function PrototypeApp() {
  const [route, setRoute] = useState<"login" | "dashboard" | "nucleo" | "lote" | "captura" | "relatorios">("login");

  const go = (r: string) => setRoute(r as any);

  return (
    <div className="min-h-screen bg-background">
      {route !== "login" && (
        <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="font-semibold">Regularização Fundiária • Protótipo</div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant={route === "dashboard" ? "default" : "ghost"} size="sm" onClick={() => go("dashboard")}>Dashboard</Button>
              <Button variant={route === "nucleo" ? "default" : "ghost"} size="sm" onClick={() => go("nucleo")}>Cadastro Núcleo</Button>
              <Button variant={route === "lote" ? "default" : "ghost"} size="sm" onClick={() => go("lote")}>Cadastro Lote</Button>
              <Button variant={route === "captura" ? "default" : "ghost"} size="sm" onClick={() => go("captura")}><Camera className="h-4 w-4 mr-1" /> Captura</Button>
              <Button variant={route === "relatorios" ? "default" : "ghost"} size="sm" onClick={() => go("relatorios")}><FileText className="h-4 w-4 mr-1" /> Relatórios</Button>
              <Button variant="outline" size="sm" onClick={() => go("login")}><LogOut className="h-4 w-4 mr-1" /> Sair</Button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <AnimatePresence mode="wait">
          {route === "login" && (
            <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <Login onSuccess={() => go("dashboard")} />
            </motion.div>
          )}

          {route !== "login" && (
            <motion.div key={route} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
              {route === "dashboard" && <Dashboard go={go} />}
              {route === "nucleo" && <CadastroNucleo onSaved={() => go("dashboard")} />}
              {route === "lote" && <CadastroLote onBack={() => go("dashboard")} />}
              {route === "captura" && <CapturaFoto onSaved={() => go("dashboard")} />}
              {route === "relatorios" && <Relatorios />}
            </motion.div>
          )}
        </AnimatePresence>

        {route !== "login" && (
          <div className="text-xs text-muted-foreground pt-4">
            * Protótipo navegável para apresentação: campos e ações são demonstrativos e não persistem dados.
          </div>
        )}
      </main>
    </div>
  );
}
