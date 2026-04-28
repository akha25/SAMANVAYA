"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Clock, CheckCircle2, UserCircle } from "lucide-react";
import api from "@/lib/api";

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
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><Clock size={12}/> Pending</span>;
      case 'assigned': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"><UserCircle size={12}/> Assigned</span>;
      case 'completed': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle2 size={12}/> Completed</span>;
      default: return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-teal-600';
      default: return 'text-slate-600';
    }
  };

  if (loading) {
    return <div className="min-h-full flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-teal-600" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Community Requests</h1>
          <p className="text-slate-500 text-sm">Need help? Ask the community volunteers.</p>
        </div>
        {role === 'user' && (
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700 text-slate-800 rounded-xl shadow-md shadow-teal-600/20 transition-all"
          >
            <Plus className="mr-2" size={16}/> New Request
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl animate-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle>Create a Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Title</label>
                <Input 
                  placeholder="What do you need help with?" 
                  className="rounded-xl focus-visible:ring-teal-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-xl border border-slate-200 focus-visible:ring-1 focus-visible:ring-teal-500 outline-none text-sm"
                  placeholder="Provide more details..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Urgency</label>
                <Select onValueChange={(val) => setFormData({...formData, urgency: val})} value={formData.urgency}>
                  <SelectTrigger className="rounded-xl focus:ring-teal-500">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
                <Button type="submit" disabled={submitting} className="bg-teal-600 hover:bg-teal-700 text-slate-800 rounded-xl">
                  {submitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
            No requests found.
          </div>
        ) : (
          requests.map((req) => (
            <Card key={req._id} className="bg-white border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between p-6 gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-800">{req.title}</h3>
                    {getStatusBadge(req.status)}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{req.description}</p>
                  <div className="flex items-center gap-4 text-xs font-medium pt-2">
                    <span className={getUrgencyColor(req.urgency)}>
                      Urgency: <span className="capitalize">{req.urgency}</span>
                    </span>
                    <span className="text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                    {(role === 'admin' || role === 'volunteer') && req.userId && (
                      <span className="text-blue-600">User: {req.userId.name || 'Unknown'}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center sm:items-start shrink-0">
                  {role === 'volunteer' && req.status === 'pending' && (
                    <Button 
                      onClick={() => handleStatusUpdate(req._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-slate-800 rounded-xl shadow-md"
                    >
                      Accept Request
                    </Button>
                  )}
                  {role === 'admin' && req.status !== 'completed' && (
                    <Button 
                      onClick={() => handleStatusUpdate(req._id, 'completed')}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 rounded-xl"
                    >
                      Mark Completed
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
