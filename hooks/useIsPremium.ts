import { useEffect, useState } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";

export const useIsPremium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkPremium = async () => {
    try {
      const customerInfo: CustomerInfo = await Purchases.getCustomerInfo();
      setIsPremium(
        customerInfo.entitlements.active["Equilibra Pro"] !== undefined,
      );
    } catch (e) {
      console.error("RevenueCat error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPremium();
  }, []);

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(checkPremium);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(checkPremium);
    };
  });

  return { isPremium, isLoading };
};
