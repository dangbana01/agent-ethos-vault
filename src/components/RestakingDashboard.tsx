import React from 'react';
import { Shield, Zap, Target, TrendingUp } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { StatsBar } from './StatsBar';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';

const mockAgents = [
  {
    id: 'conservative',
    name: 'Conservative Shield',
    description: 'Low-risk liquid staking with established validators',
    apy: '8.2%',
    risk: 'Low' as const,
    tvl: '$12.4M',
    strategy: 'Distributes stakes across top-tier validators with proven track records',
    address: '0x742d35Cc6Bf00532e3C6C0bF7b3a0b7f3b0E4D2A', // Mock Sepolia address
    icon: <Shield className="h-6 w-6 text-success" />,
  },
  {
    id: 'balanced',
    name: 'Balanced Growth',
    description: 'Optimal risk-reward with dynamic rebalancing',
    apy: '15.4%',
    risk: 'Medium' as const,
    tvl: '$18.7M',
    strategy: 'Smart allocation between liquid staking and DeFi yield opportunities',
    address: '0x8B7D3C5E9F2A1B4C6D8E0F1A2B3C4D5E6F7A8B9C', // Mock Sepolia address
    icon: <Target className="h-6 w-6 text-warning" />,
  },
  {
    id: 'aggressive',
    name: 'Alpha Hunter',
    description: 'High-yield strategies with cutting-edge protocols',
    apy: '24.7%',
    risk: 'High' as const,
    tvl: '$8.9M',
    strategy: 'Leverages emerging restaking protocols and MEV opportunities',
    address: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', // Mock Sepolia address
    icon: <Zap className="h-6 w-6 text-destructive" />,
  },
];

export const RestakingDashboard: React.FC = () => {
  const { account, connectWallet, disconnect } = useWeb3();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">RestakeProtocol</h1>
                <p className="text-sm text-muted-foreground">Intelligent Agent Restaking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {account ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </div>
                    <div className="text-xs text-muted-foreground">Sepolia Testnet</div>
                  </div>
                  <Button variant="outline" onClick={disconnect}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connectWallet} variant="gradient">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Maximize Your ETH Returns with AI Agents
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose from our intelligent restaking strategies powered by autonomous agents
          </p>
        </div>

        <StatsBar />

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Available Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-secondary border border-border/50">
          <h4 className="text-lg font-semibold text-foreground mb-3">How It Works</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <div className="font-medium text-foreground mb-2">1. Choose Your Agent</div>
              <p>Select a restaking strategy that matches your risk tolerance and return expectations.</p>
            </div>
            <div>
              <div className="font-medium text-foreground mb-2">2. Stake Your ETH</div>
              <p>Connect your wallet and stake Sepolia ETH. Our agents will manage the rest automatically.</p>
            </div>
            <div>
              <div className="font-medium text-foreground mb-2">3. Earn Rewards</div>
              <p>Watch your ETH grow through intelligent restaking strategies and compound returns.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};