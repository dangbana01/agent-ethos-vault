import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useETHPrice } from '@/hooks/useETHPrice';
import { TrendingUp, DollarSign, Users, Shield } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { price, loading } = useETHPrice();

  const stats = [
    {
      title: 'ETH Price',
      value: loading ? 'Loading...' : `$${price.toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      change: '+2.5%',
    },
    {
      title: 'Total Value Locked',
      value: '$45.2M',
      icon: <Shield className="h-5 w-5 text-success" />,
      change: '+12.3%',
    },
    {
      title: 'Active Stakers',
      value: '1,247',
      icon: <Users className="h-5 w-5 text-info" />,
      change: '+8.1%',
    },
    {
      title: 'Average APY',
      value: '15.4%',
      icon: <TrendingUp className="h-5 w-5 text-warning" />,
      change: '+0.3%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-secondary border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-success">{stat.change}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};