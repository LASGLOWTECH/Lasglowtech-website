import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
const QUILL_FORMATS = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link"];

const defaultCourse = {
  id: null,
  title: "",
  summary: "",
  description: "",
  level: "beginner",
  durationWeeks: 4,
  imageUrl: "",
  isFeatured: false,
  isPublished: true,
};

const defaultModule = {
  id: null,
  courseId: "",
  title: "",
  moduleOrder: 1,
  durationMinutes: 20,
  resourceUrl: "",
  slideUrl: "",
  videoUrl: "",
  moduleContent: "",
  referenceLinksText: "",
  isPreview: false,
};

const LmsAdmin = () => {
  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);
  const [courses, setCourses] = useState([]);
  const [courseModules, setCourseModules] = useState([]);
  const [courseForm, setCourseForm] = useState(defaultCourse);
  const [moduleForm, setModuleForm] = useState(defaultModule);
  const [loading, setLoading] = useState(false);
  const selectedModuleCourseId = moduleForm.courseId || "";

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/lms/admin/courses", { headers });
      setCourses(res.data || []);
    } catch (error) {
      toast.error("Unable to load LMS courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [headers]);

  const loadModulesForCourse = async (courseId) => {
    if (!courseId) {
      setCourseModules([]);
      return;
    }
    try {
      const res = await instance.get(`/lms/admin/courses/${courseId}/modules`, { headers });
      setCourseModules(res.data || []);
    } catch (error) {
      setCourseModules([]);
      toast.error("Unable to load modules for selected course.");
    }
  };

  useEffect(() => {
    if (selectedModuleCourseId) {
      loadModulesForCourse(selectedModuleCourseId);
    } else {
      setCourseModules([]);
    }
  }, [selectedModuleCourseId]);

  const saveCourse = async (e) => {
    e.preventDefault();
    try {
      if (courseForm.id) {
        await instance.put(`/lms/admin/courses/${courseForm.id}`, courseForm, { headers });
        toast.success("Course updated.");
      } else {
        await instance.post("/lms/admin/courses", courseForm, { headers });
        toast.success("Course created.");
      }
      setCourseForm(defaultCourse);
      loadCourses();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save course.");
    }
  };

  const saveModule = async (e) => {
    e.preventDefault();
    if (!moduleForm.courseId) return toast.error("Select a course.");
    try {
      const payload = {
        ...moduleForm,
        referenceLinks: moduleForm.referenceLinksText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean),
      };
      if (moduleForm.id) {
        await instance.put(`/lms/admin/courses/${moduleForm.courseId}/modules/${moduleForm.id}`, payload, { headers });
        toast.success("Module updated.");
      } else {
        await instance.post(`/lms/admin/courses/${moduleForm.courseId}/modules`, payload, { headers });
        toast.success("Module added.");
      }
      setModuleForm(defaultModule);
      loadModulesForCourse(moduleForm.courseId);
      loadCourses();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save module.");
    }
  };

  const editModule = (module) => {
    setModuleForm({
      id: module.id,
      courseId: String(module.course_id || ""),
      title: module.title || "",
      moduleOrder: Number(module.module_order || 1),
      durationMinutes: Number(module.duration_minutes || 20),
      resourceUrl: module.resource_url || "",
      slideUrl: module.slide_url || "",
      videoUrl: module.video_url || "",
      moduleContent: module.module_content || "",
      referenceLinksText: (module.reference_links || []).join("\n"),
      isPreview: Boolean(module.is_preview),
    });
  };

  const deleteModule = async (module) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await instance.delete(`/lms/admin/courses/${module.course_id}/modules/${module.id}`, { headers });
      toast.success("Module deleted.");
      if (moduleForm.id === module.id) {
        setModuleForm(defaultModule);
      }
      loadModulesForCourse(module.course_id);
      loadCourses();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete module.");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course and modules?")) return;
    try {
      await instance.delete(`/lms/admin/courses/${id}`, { headers });
      toast.success("Course deleted.");
      loadCourses();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h2 className="text-xl font-semibold text-textcolor2">LMS manager</h2>
          <p className="text-sm text-gray-500 mt-0.5">Create learning courses and structured modules.</p>
        </div>
        <div className="p-6">

        <form onSubmit={saveCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={courseForm.title}
            onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Course title"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <input
            value={courseForm.summary}
            onChange={(e) => setCourseForm((p) => ({ ...p, summary: e.target.value }))}
            placeholder="Course summary"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <select
            value={courseForm.level}
            onChange={(e) => setCourseForm((p) => ({ ...p, level: e.target.value }))}
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <input
            type="number"
            value={courseForm.durationWeeks}
            onChange={(e) => setCourseForm((p) => ({ ...p, durationWeeks: e.target.value }))}
            placeholder="Duration weeks"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <input
            value={courseForm.imageUrl}
            onChange={(e) => setCourseForm((p) => ({ ...p, imageUrl: e.target.value }))}
            placeholder="Image URL (optional)"
            className="md:col-span-2 p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <textarea
            value={courseForm.description}
            onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            rows={4}
            className="md:col-span-2 p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={courseForm.isFeatured}
              onChange={(e) => setCourseForm((p) => ({ ...p, isFeatured: e.target.checked }))}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={courseForm.isPublished}
              onChange={(e) => setCourseForm((p) => ({ ...p, isPublished: e.target.checked }))}
            />
            Published
          </label>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white font-semibold"
            >
              {courseForm.id ? "Update Course" : "Create Course"}
            </button>
            {courseForm.id && (
              <button
                type="button"
                className="px-6 py-3 rounded-md border border-white/20 text-gray-200"
                onClick={() => setCourseForm(defaultCourse)}
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
        </div>
      </section>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h3 className="text-xl font-semibold text-textcolor2">Add module</h3>
          <p className="text-sm text-gray-500 mt-0.5">Create or edit course modules with notes and resources.</p>
        </div>
        <div className="p-6">
        <form onSubmit={saveModule} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={moduleForm.courseId}
            onChange={(e) =>
              setModuleForm((p) => ({
                ...p,
                courseId: e.target.value,
                id: p.courseId === e.target.value ? p.id : null,
              }))
            }
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          >
            <option value="">Select course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <input
            value={moduleForm.title}
            onChange={(e) => setModuleForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Module title"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <input
            type="number"
            value={moduleForm.moduleOrder}
            onChange={(e) => setModuleForm((p) => ({ ...p, moduleOrder: e.target.value }))}
            placeholder="Order"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <input
            type="number"
            value={moduleForm.durationMinutes}
            onChange={(e) => setModuleForm((p) => ({ ...p, durationMinutes: e.target.value }))}
            placeholder="Duration (minutes)"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <input
            value={moduleForm.resourceUrl}
            onChange={(e) => setModuleForm((p) => ({ ...p, resourceUrl: e.target.value }))}
            placeholder="General resource URL (optional)"
            className="md:col-span-2 p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <input
            value={moduleForm.slideUrl}
            onChange={(e) => setModuleForm((p) => ({ ...p, slideUrl: e.target.value }))}
            placeholder="Slide PDF URL (optional)"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <input
            value={moduleForm.videoUrl}
            onChange={(e) => setModuleForm((p) => ({ ...p, videoUrl: e.target.value }))}
            placeholder="Video URL (optional)"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Module notes (rich content)</label>
            <div className="rounded-xl overflow-hidden border border-Primarycolor/20 bg-white [&_.ql-container]:min-h-[220px] [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-gray-800 [&_.ql-toolbar]:bg-gray-100 [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200">
              <ReactQuill
                theme="snow"
                value={moduleForm.moduleContent}
                onChange={(value) => setModuleForm((p) => ({ ...p, moduleContent: value }))}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder="Write detailed module content, notes, and learning objectives. Use headings, lists, and formatting for better structure."
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Reference links (one per line)</label>
            <textarea
              value={moduleForm.referenceLinksText}
              onChange={(e) => setModuleForm((p) => ({ ...p, referenceLinksText: e.target.value }))}
              placeholder={"https://example.com/doc-1\nhttps://example.com/doc-2"}
              rows={3}
              className="w-full p-3 rounded-xl border border-Primarycolor/20 bg-[#f6f5fa] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={moduleForm.isPreview}
              onChange={(e) => setModuleForm((p) => ({ ...p, isPreview: e.target.checked }))}
            />
            Preview module
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white font-semibold"
            >
              {moduleForm.id ? "Update Module" : "Add Module"}
            </button>
            {moduleForm.id && (
              <button
                type="button"
                onClick={() => setModuleForm(defaultModule)}
                className="ml-3 px-6 py-3 rounded-md border border-white/20 text-gray-200"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-5">
          <h4 className="text-lg font-semibold text-textcolor2">Module library</h4>
          <p className="text-sm text-gray-500 mt-0.5">
            Select a course above to view, edit, or delete existing modules.
          </p>
          {!selectedModuleCourseId && <p className="text-sm text-gray-400">Select a course to manage modules.</p>}
          {!!selectedModuleCourseId && !courseModules.length && (
            <p className="text-sm text-gray-400">No modules found for this course yet.</p>
          )}
          {!!selectedModuleCourseId && !!courseModules.length && (
            <div className="space-y-3">
              {courseModules.map((module) => (
                <article key={module.id} className="rounded-lg border border-Primarycolor/20 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">
                        {module.module_order}. {module.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {module.duration_minutes} mins
                        {module.slide_url ? " • Slide" : ""}
                        {module.video_url ? " • Video" : ""}
                        {module.resource_url ? " • Resource" : ""}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editModule(module)}
                        className="px-3 py-1.5 rounded-md border border-Primarycolor/50 text-textcolor2 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteModule(module)}
                        className="px-3 py-1.5 rounded-md border border-red-400/50 text-red-300 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        </div>
      </section>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h3 className="text-xl font-semibold text-textcolor2">Courses</h3>
          <p className="text-sm text-gray-500 mt-0.5">All LMS courses and their modules.</p>
        </div>
        <div className="p-6">
        {loading && <p className="text-gray-400">Loading…</p>}
        {!loading && (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="p-5 rounded-xl border border-Primarycolor/20 bg-bgcolor/50 hover:border-Primarycolor/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold">{course.title}</p>
                    <p className="text-sm text-gray-400">{course.summary}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.level} • {course.durationWeeks} weeks • Modules: {course.modulesCount} • Enrollments:{" "}
                      {course.enrollmentsCount}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCourseForm({
                          id: course.id,
                          title: course.title || "",
                          summary: course.summary || "",
                          description: course.description || "",
                          level: course.level || "beginner",
                          durationWeeks: course.durationWeeks || 4,
                          imageUrl: course.imageUrl || "",
                          isFeatured: Boolean(course.isFeatured),
                          isPublished: Boolean(course.isPublished),
                        })
                      }
                      className="px-4 py-2 rounded-md border border-Primarycolor/60 text-textcolor2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCourse(course.id)}
                      className="px-4 py-2 rounded-md border border-red-400/50 text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!courses.length && <p className="text-gray-400">No LMS courses yet.</p>}
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default LmsAdmin;
