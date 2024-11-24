import { useEffect, useState } from "react";

const Toast = ({ msg, type = "error", timer = 4000 }) => {
	const bgColors = {
		success: "#0F0",
		error: "#F00",
	};
	const [opacity, setOpacity] = useState(1);
	useEffect(() => {
		setTimeout(() => {
			setOpacity(0);
		}, timer);
	}, [timer]);
	useEffect;
	return (
		<div
			className="toastContainer"
			style={{
				background: bgColors[type],
				opacity: opacity,
			}}
		>
			{msg}
		</div>
	);
};
export default Toast;
