import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, Zap, Target } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  description: string;
  apy: string;
  risk: 'Low' | 'Medium' | 'High';
  tvl: string;
  strategy: string;
  address: string; // Address where ETH will be sent
  icon: React.ReactNode;
}

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [amount, setAmount] = useState('');
  const [staking, setStaking] = useState(false);
  const { account, connectWallet, sendETH } = useWeb3();
  const { toast } = useToast();

  const handleStake = async () => {
    if (!account) {
      await connectWallet();
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      });
      return;
    }

    setStaking(true);
    try {
      const txHash = await sendETH(agent.address, amount);
      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} ETH with ${agent.name}. Transaction: ${txHash.slice(0, 10)}...`,
      });
      setAmount('');
    } catch (error: any) {
      toast({
        title: "Staking Failed",
        description: error.message || "Failed to stake ETH",
        variant: "destructive",
      });
    } finally {
      setStaking(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-secondary border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {agent.icon}
            </div>
            <div>
              <CardTitle className="text-foreground">{agent.name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {agent.description}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getRiskColor(agent.risk)}>
            {agent.risk} Risk
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-background/50">
            <div className="text-2xl font-bold text-primary">{agent.apy}</div>
            <div className="text-sm text-muted-foreground">Expected APY</div>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <div className="text-2xl font-bold text-foreground">{agent.tvl}</div>
            <div className="text-sm text-muted-foreground">TVL</div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-background/30">
          <div className="text-sm font-medium text-foreground mb-1">Strategy</div>
          <div className="text-sm text-muted-foreground">{agent.strategy}</div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Amount to Stake (ETH)</label>
          <Input
            type="number"
            placeholder="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-background/50 border-border"
            step="0.001"
            min="0"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleStake}
          disabled={staking}
          className="w-full"
          variant="gradient"
        >
          {staking ? 'Staking...' : account ? 'Stake ETH' : 'Connect Wallet'}
        </Button>
      </CardFooter>
    </Card>
  );
};