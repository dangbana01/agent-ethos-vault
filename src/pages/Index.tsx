import { Web3Provider } from '@/contexts/Web3Context';
import { RestakingDashboard } from '@/components/RestakingDashboard';

const Index = () => {
  return (
    <Web3Provider>
      <RestakingDashboard />
    </Web3Provider>
  );
};

export default Index;
