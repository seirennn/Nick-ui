'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { ShieldCheck, Lock, Globe, Server, Check, Copy } from 'lucide-react';

export function WorkspaceSettingsBlock() {
  const [tier, setTier] = React.useState('dedicated');
  const [sessionTimeout, setSessionTimeout] = React.useState(30);
  const [mfaEnforced, setMfaEnforced] = React.useState(true);
  const [auditLogging, setAuditLogging] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 md:p-8 space-y-8">
      {/* Block Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-component-title text-text-primary font-medium tracking-tight">
              Organization Security & Deployment Tier
            </h3>
            <Badge variant="engraved" className="text-[10px]">SOC2 Type II</Badge>
          </div>
          <p className="text-metadata text-text-muted mt-1">
            Configure enterprise isolation, authentication safeguards, and session lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={handleSave} className="text-xs">
            {saved ? <Check className="w-3.5 h-3.5 mr-1.5" /> : null}
            {saved ? 'Saved Changes' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Deployment Infrastructure Tier */}
      <div className="space-y-4">
        <div>
          <h4 className="text-ui font-medium text-text-primary">
            Compute & Network Isolation Level
          </h4>
          <span className="text-metadata text-text-muted">
            Choose where your workload execution and databases reside
          </span>
        </div>

        <RadioGroup value={tier} onValueChange={setTier} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => setTier('serverless')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              tier === 'serverless'
                ? 'bg-secondary/60 border-primary/40 shadow-xs'
                : 'bg-card border-border hover:border-foreground/20'
            }`}
          >
            <RadioGroupItem
              value="serverless"
              label="Edge Serverless"
              description="Zero-coldstart ephemeral compute across 300+ edge locations worldwide."
            />
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Latency: &lt;15ms</span>
              <span>Included</span>
            </div>
          </div>

          <div
            onClick={() => setTier('dedicated')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              tier === 'dedicated'
                ? 'bg-secondary/60 border-primary/40 shadow-xs'
                : 'bg-card border-border hover:border-foreground/20'
            }`}
          >
            <RadioGroupItem
              value="dedicated"
              label="Dedicated VPC Cluster"
              description="Isolated single-tenant virtual private cloud with private peering."
            />
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Guaranteed SLA: 99.99%</span>
              <span>$450/mo</span>
            </div>
          </div>

          <div
            onClick={() => setTier('hybrid')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              tier === 'hybrid'
                ? 'bg-secondary/60 border-primary/40 shadow-xs'
                : 'bg-card border-border hover:border-foreground/20'
            }`}
          >
            <RadioGroupItem
              value="hybrid"
              label="Hybrid On-Premises"
              description="Connect your private Kubernetes clusters via encrypted WireGuard tunnel."
            />
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Air-gapped safe</span>
              <span>Enterprise</span>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Security Policies & Checkboxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="rounded-xl border border-border p-5 space-y-4 bg-card/60">
          <h4 className="text-ui font-medium text-text-primary">
            Access Guardrails & Compliance
          </h4>

          <div className="space-y-4">
            <Checkbox
              label="Enforce WebAuthn / FIDO2 Passkeys Only"
              description="Disallows SMS and email one-time passwords for administrative users"
              checked={mfaEnforced}
              onCheckedChange={setMfaEnforced}
            />
            <Checkbox
              label="Immutable Audit Log Streaming"
              description="Streams every authorization request and schema mutation to cold S3 bucket"
              checked={auditLogging}
              onCheckedChange={setAuditLogging}
            />
            <Checkbox
              label="Strict Mutual TLS (mTLS) Between Pods"
              description="Cryptographically verifies pod identity using SPIFFE/SPIRE certificates"
              defaultChecked
            />
          </div>
        </div>

        {/* Session Inactivity Timeout */}
        <div className="rounded-xl border border-border p-5 space-y-4 bg-card/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-ui font-medium text-text-primary">
                Session Inactivity Timeout
              </h4>
              <span className="text-xs font-mono font-medium text-text-primary">
                {sessionTimeout} minutes
              </span>
            </div>
            <p className="text-metadata text-text-muted mt-1">
              Automatically invalidates active access tokens when idle in browser tabs.
            </p>

            <div className="mt-6">
              <Slider
                value={sessionTimeout}
                onChange={setSessionTimeout}
                min={15}
                max={120}
                step={15}
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mt-2">
                <span>15m (Strict)</span>
                <span>60m</span>
                <span>120m (Permissive)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-text-muted">
            <span>Last policy revision: Today, 02:40 AM</span>
            <Button variant="ghost" size="sm" className="text-xs">
              View Audit Diffs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
