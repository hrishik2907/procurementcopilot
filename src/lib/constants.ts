// Central portfolio identity + procurement KPIs used across every page
// so that the entire application is internally consistent.

export const OWNER = {
  name: "Hrishik Marfatia",
  title: "Business Analytics Graduate Student",
  organization: "Enterprise Procurement Analytics Portfolio",
  email: "marfatiahrishik03@gmail.com",
  github: "https://github.com/hrishik2907",
  linkedin: "https://www.linkedin.com/in/hrishik-marfatia-199059233/",
} as const;

export const MAILTO = `mailto:${OWNER.email}` as const;

// Single procurement dataset (numbers referenced across every page)
export const KPI = {
  totalSpend: "₹ 351.05 Cr",
  contractValue: "₹ 170.42 Cr",
  budgetUtilization: "₹ 121.81 Cr",
  approvedBudget: "₹ 145.00 Cr",
  invoiceValue: "₹ 42.23 Cr",
  monthlyRunRate: "₹ 29.25 Cr",
  savingsRealised: "₹ 8.42 Cr",
  suppliers: 300,
  invoices: 1_284,
  purchaseOrders: 1_209,
  categories: 8,
  departments: 8,
  records: 5_248,
  tables: 12,
  fyRange: "FY2024 – FY2026",
  budgetUtilPct: 84.0,
  onTimeDeliveryPct: 96.7,
  invoiceMatchPct: 91.4,
  highRiskSuppliers: 14,
  mediumRiskSuppliers: 63,
  lowRiskSuppliers: 223,
} as const;
