export interface IDefaultEntityProps {
  id?: number;
  is_deleted?: boolean;
  created_by?: string;
  created_on?: Date;
  last_modified_by?: string;
  last_modified_on?: Date;
  deleted_by?: string;
  deleted_on?: Date;
  session_id?: string;
  company_code?: string;
  location_code?: string;
  branch_code?: string;
  node_code?: string;
  financial_year_id?: string;
  system_session_id?: string;
}
