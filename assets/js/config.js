// Configuración pública del navegador. La seguridad depende de grants mínimos y RLS en Supabase.
window.CASHPE_CONFIG = {
  supabaseUrl: 'https://mrikuclvirhoxcvhgant.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6Im1yaWt1Y2x2aXJob3hjdmhnYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODY0ODIsImV4cCI6MjEwNTA2MjQ4Mn0.ixq27Lleqb4AuUVI7SZB783vQd8L1_nA1xSyeNYFjkU',
  leadsTable: 'leads',
  columns: {
    name: 'name',
    company: 'company',
    email: 'email',
    phone: 'phone',
    business_type: 'business_type',
    cash_volume: 'cash_volume',
    message: 'message',
    source: 'source',
  },
};
