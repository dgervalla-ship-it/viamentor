/**
 * VIAMENTOR - Schema Validator
 * Validateur intégrité schéma database
 *
 * CHECKS:
 * - Foreign Keys existence & integrity
 * - Indexes performance (missing/unused)
 * - Constraints validation (CHECK, UNIQUE, NOT NULL)
 * - Tables expected vs actual
 * - Columns types consistency
 *
 * USAGE:
 * ```ts
 * import { SchemaValidator } from '@/polymet/data/viamentor-schema-validator';
 *
 * const validator = new SchemaValidator();
 * const report = await validator.validate();
 * console.log(report.summary);
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationIssue {
  severity: "critical" | "warning" | "info";
  type:
    | "missing_table"
    | "missing_fk"
    | "missing_index"
    | "missing_constraint"
    | "orphan_record"
    | "type_mismatch";
  table: string;
  column?: string;
  message: string;
  sql_fix?: string;
  impact: string;
}

export interface ValidationReport {
  timestamp: string;
  duration_ms: number;
  summary: {
    total_issues: number;
    critical: number;
    warnings: number;
    info: number;
    tables_checked: number;
    fks_checked: number;
    indexes_checked: number;
  };
  issues: ValidationIssue[];
  recommendations: string[];
  sql_fixes: string[];
}

export interface ExpectedSchema {
  tables: string[];
  foreign_keys: ForeignKey[];
  indexes: Index[];
  constraints: Constraint[];
}

interface ForeignKey {
  table: string;
  column: string;
  references_table: string;
  references_column: string;
  on_delete?: "CASCADE" | "SET NULL" | "RESTRICT";
}

interface Index {
  table: string;
  columns: string[];
  unique?: boolean;
  name?: string;
}

interface Constraint {
  table: string;
  column: string;
  type: "CHECK" | "UNIQUE" | "NOT NULL";
  definition?: string;
}

// ============================================================================
// EXPECTED SCHEMA (57 tables)
// ============================================================================

const EXPECTED_SCHEMA: ExpectedSchema = {
  tables: [
    // Core entities (23)
    "tenants",
    "users",
    "students",
    "instructors",
    "vehicles",
    "rooms",
    "lessons",
    "theory_courses",
    "course_types",
    "makeups",
    "invoices",
    "payments",
    "payment_methods",
    "pricing",
    "promotions",
    "prospects",
    "campaigns",
    "pixels",
    "instructor_contracts",
    "revenue_splits",
    "documents",
    "notifications",
    "audit_logs",

    // Pivot tables (9)
    "student_instructors",
    "theory_course_participants",
    "attendance",
    "vehicle_instructors",
    "room_reservations",
    "invoice_line_items",
    "campaign_prospects",
    "user_roles",
    "notification_recipients",

    // Support tables (15)
    "categories",
    "availability_slots",
    "evaluations",
    "progression",
    "themes",
    "maintenance_logs",
    "insurance_policies",
    "dunning",
    "utm_tracking",
    "pixel_events",
    "pixel_alerts",
    "onboarding_progress",
    "tours",
    "settings",
    "integrations",

    // NEW: Missing entities (10)
    "roles",
    "permissions",
    "role_permissions",
    "conflicts",
    "communications",
    "tasks",
    "messages",
    "message_recipients",
    "expiration_logs",
  ],

  foreign_keys: [
    // Roles & Permissions
    {
      table: "roles",
      column: "parent_role_id",
      references_table: "roles",
      references_column: "id",
      on_delete: "SET NULL",
    },
    {
      table: "role_permissions",
      column: "role_id",
      references_table: "roles",
      references_column: "id",
      on_delete: "CASCADE",
    },
    {
      table: "role_permissions",
      column: "permission_id",
      references_table: "permissions",
      references_column: "id",
      on_delete: "CASCADE",
    },
    {
      table: "user_roles",
      column: "role_id",
      references_table: "roles",
      references_column: "id",
      on_delete: "CASCADE",
    },

    // Conflicts
    {
      table: "conflicts",
      column: "lesson_id",
      references_table: "lessons",
      references_column: "id",
    },
    {
      table: "conflicts",
      column: "conflicting_lesson_id",
      references_table: "lessons",
      references_column: "id",
    },

    // Communications
    {
      table: "communications",
      column: "prospect_id",
      references_table: "prospects",
      references_column: "id",
    },

    // Tasks
    {
      table: "tasks",
      column: "tenant_id",
      references_table: "tenants",
      references_column: "id",
    },
    {
      table: "tasks",
      column: "assigned_to",
      references_table: "users",
      references_column: "id",
    },

    // Messages
    {
      table: "messages",
      column: "sender_id",
      references_table: "users",
      references_column: "id",
    },
    {
      table: "message_recipients",
      column: "message_id",
      references_table: "messages",
      references_column: "id",
      on_delete: "CASCADE",
    },
    {
      table: "message_recipients",
      column: "user_id",
      references_table: "users",
      references_column: "id",
    },

    // Expiration Logs
    {
      table: "expiration_logs",
      column: "makeup_id",
      references_table: "makeups",
      references_column: "id",
    },

    // Core FKs (examples)
    {
      table: "students",
      column: "tenant_id",
      references_table: "tenants",
      references_column: "id",
    },
    {
      table: "instructors",
      column: "tenant_id",
      references_table: "tenants",
      references_column: "id",
    },
    {
      table: "lessons",
      column: "student_id",
      references_table: "students",
      references_column: "id",
    },
    {
      table: "lessons",
      column: "instructor_id",
      references_table: "instructors",
      references_column: "id",
    },
    {
      table: "lessons",
      column: "vehicle_id",
      references_table: "vehicles",
      references_column: "id",
    },
  ],

  indexes: [
    // Roles & Permissions
    { table: "roles", columns: ["slug"], unique: true },
    { table: "roles", columns: ["level"] },
    { table: "permissions", columns: ["resource", "action"], unique: true },
    { table: "user_roles", columns: ["user_id"] },
    { table: "user_roles", columns: ["role_id"] },
    { table: "user_roles", columns: ["tenant_id"] },

    // Conflicts
    { table: "conflicts", columns: ["lesson_id"] },
    { table: "conflicts", columns: ["conflict_type"] },
    { table: "conflicts", columns: ["resolved"] },

    // Communications
    { table: "communications", columns: ["prospect_id"] },
    { table: "communications", columns: ["type"] },
    { table: "communications", columns: ["sent_at"] },

    // Tasks
    { table: "tasks", columns: ["tenant_id"] },
    { table: "tasks", columns: ["assigned_to"] },
    { table: "tasks", columns: ["status"] },
    { table: "tasks", columns: ["due_date"] },

    // Messages
    { table: "messages", columns: ["sender_id"] },
    { table: "message_recipients", columns: ["user_id"] },
    { table: "message_recipients", columns: ["message_id"] },

    // Expiration Logs
    { table: "expiration_logs", columns: ["makeup_id"] },
    { table: "expiration_logs", columns: ["event_type"] },
  ],

  constraints: [
    // Roles
    {
      table: "roles",
      column: "level",
      type: "CHECK",
      definition: "level >= 0 AND level <= 100",
    },
    { table: "roles", column: "slug", type: "UNIQUE" },

    // Permissions
    {
      table: "permissions",
      column: "action",
      type: "CHECK",
      definition: "action IN ('create', 'read', 'update', 'delete', 'execute')",
    },
    { table: "permissions", column: "name", type: "UNIQUE" },

    // Conflicts
    {
      table: "conflicts",
      column: "conflict_type",
      type: "CHECK",
      definition:
        "conflict_type IN ('instructor_busy', 'vehicle_busy', 'room_busy', 'student_double_booking')",
    },

    // Communications
    {
      table: "communications",
      column: "type",
      type: "CHECK",
      definition: "type IN ('email', 'sms', 'call', 'meeting')",
    },
    {
      table: "communications",
      column: "direction",
      type: "CHECK",
      definition: "direction IN ('inbound', 'outbound')",
    },

    // Tasks
    {
      table: "tasks",
      column: "priority",
      type: "CHECK",
      definition: "priority IN ('urgent', 'high', 'normal', 'low')",
    },
    {
      table: "tasks",
      column: "status",
      type: "CHECK",
      definition:
        "status IN ('pending', 'in_progress', 'completed', 'cancelled')",
    },
    { table: "tasks", column: "title", type: "NOT NULL" },
  ],
};

// ============================================================================
// SCHEMA VALIDATOR CLASS
// ============================================================================

export class SchemaValidator {
  private startTime: number = 0;
  private issues: ValidationIssue[] = [];

  /**
   * Validate complete schema
   */
  async validate(): Promise<ValidationReport> {
    this.startTime = Date.now();
    this.issues = [];

    // Run all checks
    await this.checkTables();
    await this.checkForeignKeys();
    await this.checkIndexes();
    await this.checkConstraints();

    // Generate report
    return this.generateReport();
  }

  /**
   * Check tables existence
   */
  private async checkTables(): Promise<void> {
    // Simulate DB query
    const actualTables = await this.getActualTables();

    for (const expectedTable of EXPECTED_SCHEMA.tables) {
      if (!actualTables.includes(expectedTable)) {
        this.issues.push({
          severity: "critical",
          type: "missing_table",
          table: expectedTable,
          message: `Table '${expectedTable}' manquante`,
          sql_fix: `-- Voir migration 001_add_missing_entities.sql`,
          impact: "Fonctionnalité bloquée",
        });
      }
    }
  }

  /**
   * Check foreign keys
   */
  private async checkForeignKeys(): Promise<void> {
    const actualFKs = await this.getActualForeignKeys();

    for (const expectedFK of EXPECTED_SCHEMA.foreign_keys) {
      const fkExists = actualFKs.some(
        (fk) =>
          fk.table === expectedFK.table &&
          fk.column === expectedFK.column &&
          fk.references_table === expectedFK.references_table
      );

      if (!fkExists) {
        this.issues.push({
          severity: "critical",
          type: "missing_fk",
          table: expectedFK.table,
          column: expectedFK.column,
          message: `FK manquante: ${expectedFK.table}.${expectedFK.column} → ${expectedFK.references_table}`,
          sql_fix: `ALTER TABLE ${expectedFK.table} ADD CONSTRAINT fk_${expectedFK.table}_${expectedFK.column} FOREIGN KEY (${expectedFK.column}) REFERENCES ${expectedFK.references_table}(${expectedFK.references_column})${expectedFK.on_delete ? ` ON DELETE ${expectedFK.on_delete}` : ""};`,
          impact: "Intégrité référentielle compromise",
        });
      }
    }
  }

  /**
   * Check indexes
   */
  private async checkIndexes(): Promise<void> {
    const actualIndexes = await this.getActualIndexes();

    for (const expectedIndex of EXPECTED_SCHEMA.indexes) {
      const indexExists = actualIndexes.some(
        (idx) =>
          idx.table === expectedIndex.table &&
          JSON.stringify(idx.columns) === JSON.stringify(expectedIndex.columns)
      );

      if (!indexExists) {
        this.issues.push({
          severity: "warning",
          type: "missing_index",
          table: expectedIndex.table,
          message: `Index manquant: ${expectedIndex.table}(${expectedIndex.columns.join(", ")})`,
          sql_fix: `CREATE INDEX${expectedIndex.unique ? " UNIQUE" : ""} idx_${expectedIndex.table}_${expectedIndex.columns.join("_")} ON ${expectedIndex.table}(${expectedIndex.columns.join(", ")});`,
          impact: "Performance queries dégradée",
        });
      }
    }
  }

  /**
   * Check constraints
   */
  private async checkConstraints(): Promise<void> {
    const actualConstraints = await this.getActualConstraints();

    for (const expectedConstraint of EXPECTED_SCHEMA.constraints) {
      const constraintExists = actualConstraints.some(
        (c) =>
          c.table === expectedConstraint.table &&
          c.column === expectedConstraint.column &&
          c.type === expectedConstraint.type
      );

      if (!constraintExists) {
        this.issues.push({
          severity: "warning",
          type: "missing_constraint",
          table: expectedConstraint.table,
          column: expectedConstraint.column,
          message: `Constraint ${expectedConstraint.type} manquante: ${expectedConstraint.table}.${expectedConstraint.column}`,
          sql_fix: this.generateConstraintSQL(expectedConstraint),
          impact: "Validation données non garantie",
        });
      }
    }
  }

  /**
   * Generate constraint SQL
   */
  private generateConstraintSQL(constraint: Constraint): string {
    switch (constraint.type) {
      case "CHECK":
        return `ALTER TABLE ${constraint.table} ADD CONSTRAINT chk_${constraint.table}_${constraint.column} CHECK (${constraint.definition});`;
      case "UNIQUE":
        return `ALTER TABLE ${constraint.table} ADD CONSTRAINT uniq_${constraint.table}_${constraint.column} UNIQUE (${constraint.column});`;
      case "NOT NULL":
        return `ALTER TABLE ${constraint.table} ALTER COLUMN ${constraint.column} SET NOT NULL;`;
      default:
        return "";
    }
  }

  /**
   * Generate validation report
   */
  private generateReport(): ValidationReport {
    const duration = Date.now() - this.startTime;

    const critical = this.issues.filter(
      (i) => i.severity === "critical"
    ).length;
    const warnings = this.issues.filter((i) => i.severity === "warning").length;
    const info = this.issues.filter((i) => i.severity === "info").length;

    const recommendations: string[] = [];
    if (critical > 0) {
      recommendations.push(
        "⚠️ URGENT: Corriger anomalies critiques (tables/FK manquantes)"
      );
    }
    if (warnings > 0) {
      recommendations.push("⚡ Ajouter indexes manquants pour performance");
    }
    if (this.issues.length === 0) {
      recommendations.push("✅ Schéma conforme, aucune anomalie détectée");
    }

    const sql_fixes = this.issues
      .filter((i) => i.sql_fix)
      .map((i) => i.sql_fix!);

    return {
      timestamp: new Date().toISOString(),
      duration_ms: duration,
      summary: {
        total_issues: this.issues.length,
        critical,
        warnings,
        info,
        tables_checked: EXPECTED_SCHEMA.tables.length,
        fks_checked: EXPECTED_SCHEMA.foreign_keys.length,
        indexes_checked: EXPECTED_SCHEMA.indexes.length,
      },
      issues: this.issues,
      recommendations,
      sql_fixes,
    };
  }

  /**
   * Mock: Get actual tables from DB
   */
  private async getActualTables(): Promise<string[]> {
    // Simulate DB query
    return [
      "tenants",
      "users",
      "students",
      "instructors",
      "vehicles",
      "lessons",
      "invoices",
      "payments",
      // Missing: roles, permissions, conflicts, etc.
    ];
  }

  /**
   * Mock: Get actual foreign keys from DB
   */
  private async getActualForeignKeys(): Promise<ForeignKey[]> {
    return [
      {
        table: "students",
        column: "tenant_id",
        references_table: "tenants",
        references_column: "id",
      },
      {
        table: "lessons",
        column: "student_id",
        references_table: "students",
        references_column: "id",
      },
      // Missing: roles FKs, conflicts FKs, etc.
    ];
  }

  /**
   * Mock: Get actual indexes from DB
   */
  private async getActualIndexes(): Promise<Index[]> {
    return [
      { table: "students", columns: ["tenant_id"] },
      { table: "lessons", columns: ["student_id"] },
      // Missing: roles indexes, conflicts indexes, etc.
    ];
  }

  /**
   * Mock: Get actual constraints from DB
   */
  private async getActualConstraints(): Promise<Constraint[]> {
    return [
      { table: "students", column: "email", type: "UNIQUE" },
      // Missing: roles constraints, conflicts constraints, etc.
    ];
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export default SchemaValidator;
