"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Clock, CheckCircle2, UserCircle, AlertCircle, FileText, X } from "lucide-react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [role, setRole] = useState("user");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    urgency: "low"
  });

  const fetchRequests = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setRole(user.role || 'user');
      }

      const res = await api.get('/requests');
      if (res.data.success) {
        setRequests(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/requests', formData);
      if (res.data.success) {
        toast.success("Request created successfully!");
        setShowForm(false);
        setFormData({ title: "", description: "", urgency: "low" });
        fetchRequests();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus?: string) => {
    try {
      const payload = newStatus ? { status: newStatus } : {};
      const res = await api.put(`/requests/${id}`, payload);
      if (res.data.success) {
        toast.success("Request updated!");
        fetchRequests();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update request");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><Clock size={12}/> Pending</span>;
      case 'assigned': return <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><UserCircle size={12}/> Assigned</span>;
      case 'completed': return <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><CheckCircle2 size={12}/> Completed</span>;
      default: return null;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return <span className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">High</span>;
      case 'medium': return <span className="text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">Med</span>;
      case 'low': return <span className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">Low</span>;
      default: return <span className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">{urgency}</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[2rem] animate-pulse"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Community Requests</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Need help or want to offer support? This is the place.</p>
        </div>
        {role === 'user' && (
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-teal-500/20 transition-all px-6 py-5"
          >
            {showForm ? <X className="mr-2" size={18}/> : <Plus className="mr-2" size={18}/>}
            {showForm ? "Cancel" : "New Request"}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] mb-8">
              <CardHeader className="pt-8 px-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                  <FileText className="text-teal-500" /> Create a Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative group">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Title</label>
                      <Input 
                        placeholder="What do you need help with?" 
                        className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all text-base dark:text-slate-100"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 relative group">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Urgency</label>
                      <Select onValueChange={(val) => setFormData({...formData, urgency: val || ""})} value={formData.urgency}>
                        <SelectTrigger className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-base dark:text-slate-100">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl dark:bg-slate-800">
                          <SelectItem value="low" className="py-3">Low</SelectItem>
                          <SelectItem value="medium" className="py-3">Medium</SelectItem>
                          <SelectItem value="high" className="py-3">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                    <textarea 
                      className="w-full min-h-[120px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 outline-none text-base transition-all resize-none dark:text-slate-100"
                      placeholder="Provide more details..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={submitting} className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-teal-500/30 px-8 py-6 text-base font-semibold border-0 transition-transform active:scale-95">
                      {submitting ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {requests.length === 0 ? (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 border-dashed dark:border-slate-800">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No requests found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">There are currently no community requests. Check back later or create a new one!</p>
         </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {requests.map((req) => (
            <motion.div key={req._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card className="h-full flex flex-col bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] hover:-translate-y-2 hover:shadow-xl dark:hover:bg-slate-800 transition-all duration-300 overflow-hidden group">
                <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    {getUrgencyBadge(req.urgency)}
                    <span className="text-xs font-medium text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">{req.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{req.description}</p>
                  
                  <div className="mt-auto space-y-5">
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5">
                      {getStatusBadge(req.status)}
                      {(role === 'admin' || role === 'volunteer') && req.userId && (
                        <div className="flex items-center gap-2">
                          <UserCircle size={16} className="text-slate-400" />
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[100px]">{req.userId.name || 'Unknown'}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {role === 'volunteer' && req.status === 'pending' && (
                        <Button 
                          onClick={() => handleStatusUpdate(req._id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all active:scale-95"
                        >
                          Accept
                        </Button>
                      )}
                      {role === 'admin' && req.status !== 'completed' && (
                        <Button 
                          onClick={() => handleStatusUpdate(req._id, 'completed')}
                          variant="outline"
                          className="w-full border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all active:scale-95"
                        >
                          Mark Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
