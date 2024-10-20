import React from "react";
import { useSpring, animated } from "react-spring";

function AnimatedBackground() {
	const props = useSpring({
		from: {
			transform: "translateX(0%)",
		},
		to: {
			transform: "translateX(100%)",
		},
		config: { duration: 10000 }, // Ajustez la durée selon vos besoins
		loop: true,
	});

	return (
		<animated.div
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: -1,
				overflow: "hidden",
			}}
		>
			<animated.img
				src={process.env.PUBLIC_URL + "/images/carambar_smile.png"} //car l'image n'était pas reconnu dans le dossier publi
				alt="fond"
				style={{
					...props,
					position: "absolute",
					height: "100%",
					width: "auto",
					objectFit: "cover",
				}}
			/> 

		
		</animated.div>
	);
}

export default AnimatedBackground;
