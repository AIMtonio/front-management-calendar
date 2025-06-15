export interface Evento {
  id_event: number;
  cve_event: string;
  name: string;
  description: string;
  date_event: string;
  status: string;
  uuid_user: string;
  create_at: string;
  create_by: string;
  update_by: string | null;
  update_at: string;
}