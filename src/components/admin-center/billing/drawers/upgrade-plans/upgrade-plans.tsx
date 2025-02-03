import { useEffect } from "react";

import { adminCenterApiService } from "@/api/admin-center/admin-center.api.service";
import { useState } from "react";
import { IPricingPlans } from "@/types/admin-center/admin-center.types";
import logger from "@/utils/errorLogger";

const UpgradePlans = () => {
  const [plans, setPlans] = useState<IPricingPlans>({});
  const [loadingPlans, setLoadingPlans] = useState(false);

  const fetchPricingPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await adminCenterApiService.getPlans();
      if (res.done) {
        setPlans(res.body);
      }
    } catch (error) {
      logger.error('Error fetching pricing plans', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  return <div>
    {Object.keys(plans).map((plan) => (
      <div key={plan}>
        {plan}
      </div>
    ))}
  </div>;
};

export default UpgradePlans;
