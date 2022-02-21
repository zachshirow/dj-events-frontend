export default function Input({ type, name, label, value, onChange }) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
