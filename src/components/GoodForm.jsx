import validator from "validator";
import { useForm } from "react-hook-form";

const GoodForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};
	console.log({ errors });
	console.log("RENDERIZEI ");

	const watchPassword = watch("password");

	console.log(watchPassword);
	return (
		<div className="app-container">
			<div className="form-group">
				<h1>Cadastre-se</h1>
				<label>Nome</label>
				<input
					className={errors?.name && "input-error"}
					type="text"
					placeholder="Seu nome"
					{...register("name", { required: true })}
				/>
				{errors?.name?.type === "required" && (
					<p className="error-message">Nome é obrigatório</p>
				)}
			</div>

			<div className="form-group">
				<label>E-mail</label>
				<input
					className={errors?.email && "input-error"}
					type="email"
					placeholder="Seu e-mail"
					{...register("email", {
						required: true,
						validate: (value) => validator.isEmail(value)
					})}
				/>
				{errors?.email?.type === "required" && (
					<p className="error-message">E-mail obrigatório</p>
				)}

				{errors?.email?.type === "validate" && (
					<p className="error-message">E-mail inválido</p>
				)}
			</div>

			<div className="form-group">
				<label>Senha</label>
				<input
					className={errors?.password && "input-error"}
					type="password"
					placeholder="Senha"
					{...register("password", { required: true, minLength: 8 })}
				/>
				{errors?.password?.type === "minLength" && (
					<p className="error-message">
						A senha deve conter no minímo 8 caracteres
					</p>
				)}
				{errors?.password?.type === "required" && (
					<p className="error-message">A senha deve ser preenchida</p>
				)}
			</div>

			<div className="form-group">
				<label>Confirmação de senha</label>
				<input
					className={errors?.passwordConfirmartion && "input-error"}
					type="password"
					placeholder="Digite sua senha novamente"
					{...register("passwordConfirmartion", {
						required: true,
						minLength: 8,
						validate: (value) => value === watchPassword
					})}
				/>

				{errors?.passwordConfirmartion?.type === "required" && (
					<p className="error-message">A senha deve ser preenchida</p>
				)}
				{errors?.passwordConfirmartion?.type === "validate" && (
					<p className="error-message">Senhas não conferem</p>
				)}
				{errors?.passwordConfirmartion?.type === "minLength" && (
					<p className="error-message">
						A senha deve conter no minímo 8 caracteres
					</p>
				)}
			</div>

			<div className="form-group">
				<label>Profissão</label>
				<select
					{...register("profession", {
						validate: (value) => {
							return value !== "0";
						}
					})}
					className={errors?.profession && "input-error"}
				>
					<option value="0">Selecione sua profissão...</option>
					<option value="developer">Desenvolvedor</option>
					<option value="other">Outra</option>
				</select>

				{errors?.profession?.type === "validate" && (
					<p className="error-message">Selecione a sua profissão</p>
				)}
			</div>

			<div className="form-group">
				<div className="checkbox-group">
					<input
						type="checkbox"
						name="privacy-policy"
						{...register("privacyTerms", { required: true })}
					/>
					<label>I agree with the privacy terms.</label>
				</div>

				{errors?.privacyTerms?.type === "required" && (
					<p className="error-message">
						Você deve aceitar os termos para continuar.
					</p>
				)}
			</div>

			<div className="form-group">
				<button onClick={() => handleSubmit(onSubmit)()}>
					Criar conta
				</button>
			</div>
		</div>
	);
};

export default GoodForm;
