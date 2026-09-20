'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AreaChart, AreaChartDataPoint } from '@/components/ui/charts/area-chart';
import { Sparkline } from '@/components/ui/charts/sparkline';
import {
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  Download,
  Copy,
  Check,
  Calendar,
  Activity,
} from 'lucide-react';

const REVENUE_TIMELINE: AreaChartDataPoint[] = [
  { label: 'Jan', value: 74, formattedValue: '$74,000' },
  { label: 'Feb', value: 81, formattedValue: '$81,000' },
  { label: 'Mar', value: 79, formattedValue: '$79,000' },
  { label: 'Apr', value: 92, formattedValue: '$92,000' },
  { label: 'May', value: 98, formattedValue: '$98,000' },
  { label: 'Jun', value: 106, formattedValue: '$106,000' },
  { label: 'Jul', value: 112, formattedValue: '$112,000' },
  { label: 'Aug', value: 118, formattedValue: '$118,000' },
  { label: 'Sep', value: 115, formattedValue: '$115,000' },
  { label: 'Oct', value: 124, formattedValue: '$124,000' },
  { label: 'Nov', value: 129, formattedValue: '$129,000' },
  { label: 'Dec', value: 138, formattedValue: '$138,000' },
];

interface Transaction {
  id: string;
  customer: string;
  plan: 'Enterprise' | 'Scale' | 'Pro';
  amount: string;
  date: string;
  status: 'Completed' | 'Processing';
}

const TRANSACTIONS: Transaction[] = [
  { id: 'tx-01', customer: 'Vanguard Systems', plan: 'Enterprise', amount: '$4,800.00', date: 'Just now', status: 'Completed' },
  { id: 'tx-02', customer: 'Northwind Medical', plan: 'Enterprise', amount: '$3,200.00', date: '2h ago', status: 'Completed' },
  { id: 'tx-03', customer: 'Krypton Labs', plan: 'Scale', amount: '$1,400.00', date: '5h ago', status: 'Completed' },
  { id: 'tx-04', customer: 'Linearity Software', plan: 'Pro', amount: '$680.00', date: 'Yesterday', status: 'Processing' },
  { id: 'tx-05', customer: 'Aura Robotics', plan: 'Scale', amount: '$1,400.00', date: '2d ago', status: 'Completed' },
];

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = React.useState('12m');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`import { AnalyticsDashboard } from '@/components/blocks/AnalyticsDashboard';`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card p-6 md:p-8 space-y-8 shadow-tactile">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg text-text-primary font-medium tracking-tight">
              Revenue & Financial Telemetry
            </h3>
            <Badge variant="status" status="success">Live Stream</Badge>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Reconciled recurring ARR, gross transaction volume, and active compute seats.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-secondary/60 border border-border/60 text-xs">
            {['30d', '90d', '12m'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-background text-text-primary font-medium shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Copy Block'}
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Monthly Recurring ARR</span>
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              $128,400
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-500 font-medium">+14.2%</span>
              <span className="text-[11px] text-text-muted">vs previous period</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[42, 48, 55, 62, 70, 78, 86, 94]} height={28} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Active Team Seats</span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              1,480
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-500 font-medium">+8.6%</span>
              <span className="text-[11px] text-text-muted">seats added</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[30, 32, 38, 41, 45, 52, 59, 64]} height={28} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Gross Volume (YTD)</span>
            <CreditCard className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              $842,900
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-500 font-medium">+11.8%</span>
              <span className="text-[11px] text-text-muted">growth rate</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[60, 68, 72, 75, 82, 88, 92, 98]} height={28} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Verification Rate</span>
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              99.98%
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-text-muted">Zero failover events</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[98, 99, 99, 99, 100, 100, 100, 100]} height={28} />
          </div>
        </div>
      </div>

      {/* Main Area Chart Card */}
      <div className="p-5 rounded-xl bg-secondary/20 border border-border/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-text-primary">Net Revenue Velocity</h4>
            <span className="text-xs text-text-muted">Annual recurring progression ($USD)</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span>Peak: $138,000</span>
            <span>•</span>
            <span>Baseline: $74,000</span>
          </div>
        </div>

        <div className="pt-2">
          <AreaChart data={REVENUE_TIMELINE} height={220} unit="k" />
        </div>
      </div>

      {/* Recent Ledger Records */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-text-primary">Recent Settlement Ledger</h4>
          <span className="text-xs text-text-muted font-mono">Showing last 5 records</span>
        </div>

        <div className="rounded-xl border border-border/60 overflow-hidden bg-secondary/10">
          <table className="w-full text-xs text-left">
            <thead className="bg-secondary/40 text-text-muted border-b border-border/60 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-text-primary font-medium font-sans">
                    <div>{tx.customer}</div>
                    <div className="text-[10px] text-text-muted font-mono">{tx.date}</div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">{tx.plan}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="status" status={tx.status === 'Completed' ? 'success' : 'neutral'}>
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right text-text-primary font-medium">
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
