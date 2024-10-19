import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";
import ApiInteger from "./components/ApiInteger";
import ContactForm from "./components/ContactForm";
import logo from "./images/logo-carambar.png";
import AnimatedBackground from "./components/AnimatedBackground";

// composant header
function Header() {
	const logoProps = useSpring({
		from: { transform: "rotate(0deg)" },
		to: { transform: "rotate(360deg)" },
		loop: true,
		config: { duration: 2000 },
	});

	const titleProps = useSpring({
		from: { opacity: 0, transform: "translateY(-50px)" },
		to: { opacity: 1, transform: "translateY(0)" },
		config: { tension: 300, friction: 10 },
	});

	return (
		<header className="App-header">
			<div>
				<animated.img
					src={logo}
					alt="Logo Carambar"
					className="App-logo"
					style={logoProps}
				/>
			</div>
			<animated.h1 style={titleProps}>Les blagues Carambar</animated.h1>
			<div>
				<animated.img
					src={logo}
					alt="Logo Carambar"
					className="App-logo"
					style={logoProps}
				/>
			</div>
		</header>
	);
}

// composant Footer
function Footer() {
	const [showContactForm, setShowContactForm] = useState(false);

	const toggleContactForm = () => {
		setShowContactForm(!showContactForm);
	};

	const buttonProps = useSpring({
		scale: showContactForm ? 1.1 : 1,
		config: { tension: 300, friction: 10 },
	});

	return (
		<footer className="App-footer">
			<animated.button
				onClick={toggleContactForm}
				className="button-form"
				style={buttonProps}
			>
				{showContactForm ? "Fermer" : "Recevoir les liens des repos"}
			</animated.button>
			{showContactForm && <ContactForm />}
		</footer>
	);
}

function App() {
	const appProps = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 1000 },
	});

	return (
		<animated.div className="App" style={appProps}>
			<AnimatedBackground />
			<div id="content">
				<Header />
				<main className="joke-section">
					<div className="api">
						<ApiInteger />
					</div>
				</main>
				<Footer />
			</div>
		</animated.div>
	);
}

export default App;
