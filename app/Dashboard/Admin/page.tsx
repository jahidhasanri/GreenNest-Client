import DashboardStats from '@/app/components/DashboardOverView/DashboardStats';
import RecentOrders from '@/app/components/DashboardOverView/RecentOrders';
import RevenueAnalytics from '@/app/components/DashboardOverView/RevenueAnalytics';
import React from 'react';

const page = () => {
    return (
        <div className="mt-8 px-2 md:px-8">
           <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
           <DashboardStats></DashboardStats>
           <RevenueAnalytics></RevenueAnalytics>
           <RecentOrders></RecentOrders>
        </div>
    );
};

export default page;