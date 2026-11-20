import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { fetchMilestones } from '../../api/experienceApi';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Calendar, LayoutList } from 'lucide-react';

export function ExperienceDetail() {
  const { id } = useParams();
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMilestones();
        const found = data.find((m) => String(m.id) === String(id));
        setMilestone(found);
      } catch (err) {
        // error handled
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-16 text-gray-400">Loading milestone details...</div>
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="p-6 text-center py-16 text-gray-400">
        <p className="text-lg">Milestone not found.</p>
        <Link to="/admin/experience" className="text-[#BC6034] hover:underline text-sm mt-2 inline-block">
          Back to Timeline
        </Link>
      </div>
    );
  }

  const Icon = milestone.icon && LucideIcons[milestone.icon] ? LucideIcons[milestone.icon] : null;

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Milestone Details</h1>
          <p className="text-sm text-gray-500 font-body-md mt-1">View the full details of this timeline entry</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-[#BC6034] shadow-sm p-8 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#BC6034]/10 rounded-full flex items-center justify-center text-[#BC6034] font-bold text-2xl shadow-sm">
              {milestone.order}
            </div>
            <div>
              <span className="font-headline-sm text-2xl font-bold text-[#BC6034] block mb-1">
                {milestone.year}
              </span>
              <div className="flex items-center text-xs font-label-caps uppercase tracking-wider text-gray-500">
                <span className="mr-1.5">Icon:</span>
                {Icon ? <Icon className="w-4 h-4 text-[#BC6034] ml-1" /> : '—'}
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-headline-md text-headline-md text-primary mb-4 font-bold">{milestone.title}</h3>
        <p className="font-body-md text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap">{milestone.description}</p>
      </div>
    </div>
  );
}
