(function(win,doc){
		
	var valueCheck;
	var $password = doc.querySelector("[data-js='senha']");
	var $confirmPassword = doc.querySelector("[data-js='confirmPassword']");
	var $alertPassword = doc.querySelector("[data-js='alertPassword']");
	var $submit = doc.querySelector("[data-js='form-submit']");
	var $verificatorOne = doc.querySelector("[data-js='ball1']");
	var $verificatorTwo = doc.querySelector("[data-js='ball2']");
	var $verificatorThree = doc.querySelector("[data-js='ball3']");
	var $highlighterOne = doc.querySelector("[data-js='ver1']");
	var $highlighterTwo = doc.querySelector("[data-js='ver2']");
	var $highlighterThree = doc.querySelector("[data-js='ver3']");
	var regexOne = new RegExp("(?:\\w|\\s){5,}.+");
	var regexTwo = new RegExp("[A-Z]");
	var regexThree = new RegExp("\\d");
	var colorRed = "#F79682";
	var colorGreen = "#1FE6A8";
	var colorOrange = "#F7BC1C";
	var colorGray = "#EAEAF4";
	var isReady = false;


$password.addEventListener("input",handleInput,false);

function handleInput(){
		valueCheck = this;
		var valorToCheckOne = Verification(regexOne,$verificatorOne);
		var valorToCheckTwo = Verification(regexTwo,$verificatorTwo);
		var valorToCheckThree = Verification(regexThree,$verificatorThree);
		hits(valorToCheckOne,valorToCheckTwo,valorToCheckThree);
}

function Verification(regex,ball){
			if(asVerificed(regex)){
				ball.classList.remove("customSetGray");
				ball.classList.remove("customSetRed");
				ball.classList.add("customSetGreen");
				return 1;
			}
			if($password.value === ""){
				 ball.classList.remove("customSetRed");
				 ball.classList.remove("customSetGreen");
				 ball.classList.add("customSetGray");
				 return;
				}
		ball.classList.remove("customSetGray");
		ball.classList.remove("customSetGreen");
		ball.classList.add("customSetRed");
}

function asVerificed(regex){
	return regex.test(valueCheck.value);
}

function hits(one,two,three){
	if(one === 1 || two === 1 || three === 1)
			aValue();
	else{
		$highlighterOne.classList.remove("customSetRed");
		
	}
	if(one === 1 && two === 1 || one === 1 && three === 1 || two === 1 && three === 1 )
		twoValues();
	else{
		$highlighterOne.classList.remove("customSetOrange");
		$highlighterTwo.classList.remove("customSetOrange");
		
	}
	if(one === 1 && two === 1 && three === 1)
		threeValues();
	else{
		$highlighterOne.classList.remove("customSetGreen");
		$highlighterTwo.classList.remove("customSetGreen");
		$highlighterThree.classList.remove("customSetGreen");
	}
	if($password.value === ""){
		$password.classList.remove("customSetBorderColorGreen");
		$password.classList.remove("customSetBorderColorRed");
	}

	
}

function aValue(){
	$highlighterOne.classList.add("customSetRed");
	$password.classList.add("customSetBorderColorRed");
	isReady = false;
}

function twoValues(){
	$password.classList.remove("customSetBorderColorGreen");
	$password.classList.add("customSetBorderColorRed");
	$highlighterOne.classList.remove("customSetRed");
	$highlighterOne.classList.add("customSetOrange");
	$highlighterTwo.classList.add("customSetOrange");
	isReady = false;
}

function threeValues(){
	$highlighterOne.classList.remove("customSetOrange");
	$highlighterTwo.classList.remove("customSetOrange");
	$highlighterOne.classList.add("customSetGreen");
	$highlighterTwo.classList.add("customSetGreen");
	$highlighterThree.classList.add("customSetGreen");
	$password.classList.remove("customSetBorderColorRed");
	$password.classList.add("customSetBorderColorGreen");
	isReady = true;
}

$submit.addEventListener("submit",handleSubmit,false);
function handleSubmit(e){
	e.preventDefault();
	if(($password.value !== $confirmPassword.value)){
		$alertPassword.textContent = "Senha e confirmação de senha não coincidem.";
		$alertPassword.classList.remove("isGreen");
		$alertPassword.classList.add("isRed");
		return;
	}
	if(isReady !== true){
		$alertPassword.textContent = "O nivel de segurança da sua senha está muito baixo."
		$alertPassword.classList.remove("isGreen");
		$alertPassword.classList.add("isRed");
		return;
	}
	$alertPassword.textContent = "Cadastrado com sucesso!";
	$alertPassword.classList.remove("isRed");
	$alertPassword.classList.add("isGreen");

	
}

})(window,document);