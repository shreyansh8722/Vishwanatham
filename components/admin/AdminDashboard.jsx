import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, ArrowUpRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { formatPrice } from '@/lib/utils';

export const AdminDashboard = ({ notify, onChangeTab }) => { // Receives onChangeTab
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Orders
      const ordersSnap = await getDocs(collection(db, 'orders'));
      let totalRev = 0;
      const uniqueCustomers = new Set();
      const statusCount = { Pending: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
      
      // Data for Chart (Last 7 Days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return { date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), sales: 0, orders: 0 };
      }).reverse();

      ordersSnap.forEach(doc => {
        const data = doc.data();
        totalRev += (data.totalAmount || 0);
        if (data.userId) uniqueCustomers.add(data.userId);
        
        // Status Count
        if (statusCount[data.status] !== undefined) statusCount[data.status]++;

        // Sales Chart Data Logic
        if (data.createdAt) {
          const orderDate = data.createdAt.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
          const dayStat = last7Days.find(d => d.date === orderDate);
          if (dayStat) {
            dayStat.sales += data.totalAmount;
            dayStat.orders += 1;
          }
        }
      });

      // 2. Fetch Products
      const productsSnap = await getDocs(collection(db, 'products'));

      // 3. Recent Orders
      const recentQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
      const recentSnap = await getDocs(recentQ);
      
      setStats({
        revenue: totalRev,
        orders: ordersSnap.size,
        products: productsSnap.size,
        customers: uniqueCustomers.size
      });
      
      setSalesData(last7Days);
      setStatusData([
        { name: 'Pending', value: statusCount.Pending, color: '#F59E0B' },
        { name: 'Shipped', value: statusCount.Shipped, color: '#3B82F6' },
        { name: 'Delivered', value: statusCount.Delivered, color: '#10B981' },
        { name: 'Cancelled', value: statusCount.Cancelled, color: '#EF4444' },
      ].filter(i => i.value > 0)); 

      setRecentOrders(recentSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between group hover:shadow-md transition-all">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className="text-xs text-green-600 flex items-center gap-1 mt-2 font-medium">
            <ArrowUpRight size={12} /> {trend} this week
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.replace('bg-', '')}`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  );

  if (loading) return <div className="p-10 text-center text-gray-400">Loading Dashboard...</div>;

  return (
    <div className="space-y-8 pb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={formatPrice(stats.revenue)} icon={DollarSign} color="bg-green-500" trend="+12%" />
        <StatCard title="Total Orders" value={stats.orders} icon={ShoppingBag} color="bg-blue-500" trend="+5%" />
        <StatCard title="Active Products" value={stats.products} icon={Package} color="bg-purple-500" />
        <StatCard title="Customers" value={stats.customers} icon={Users} color="bg-orange-500" trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#B08D55]" /> Sales Overview
            </h3>
            <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B08D55" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#B08D55" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} tickFormatter={(value) => `₹${value/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#1f2937', fontSize: '12px', fontWeight: 'bold' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="sales" stroke="#B08D55" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Order Status</h3>
          <div className="h-[250px] relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={statusData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {statusData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-900">{stats.orders}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
             </div>
          </div>
          <div className="mt-4 space-y-2">
             {statusData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600">{item.name}</span>
                   </div>
                   <span className="font-bold text-gray-900">{item.value}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          {/* Use onChangeTab here to switch to Orders tab */}
          <button 
            onClick={() => onChangeTab && onChangeTab('orders')} 
            className="text-xs font-bold text-[#B08D55] uppercase tracking-widest hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-600 text-xs">#{order.id.slice(0,8)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.shippingDetails?.firstName || order.userEmail}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">₹{order.totalAmount?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};