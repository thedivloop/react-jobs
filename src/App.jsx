import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/jobPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
	// Add new Job
	const addJob = async (newJob) => {
		const res = await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	// Delete Job
	const deleteJob = async (id) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});
		console.log(`job ${id} deleted`);
		return;
	};

	// Update Job
	const updateJob = async (job) => {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(job),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/job/:id"
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				/>
				<Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
				<Route
					path="/edit-job/:id"
					element={<EditJobPage updateJobSubmit={updateJob} />}
					loader={jobLoader}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);
	return <RouterProvider router={router} />;
};

export default App;
