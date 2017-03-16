var template = `
<ul>
  <% for(var i = 0; i < data.supplies.length;i++){ %>
  	<li><%= data.supplies[i] %></li>          //<%...%>中放置javascript代码，输出javascript表达式
  <% } %>
</ul>

`;

function compile(template) {
	var evalExpr = /<%=(.+?)%>/g;
	var expr = /<%([\s\S]+?)%>/g;

	template = template
		.replace(evalExpr, '`);\n echo( $1 ); \n echo(`')
		.replace(expr, '`); \n $1 \n echo(`');
	template = 'echo(`' + template + '`);';

	var script =
		`(function parse(data){
	var output = "";

	function echo(html){
		output += html;
	}

	${ template }

	return output;
})`;

	return script;
}

var parse = eval(compile(template));
div.innerHTML = parse({
	supplies: ["broom", "mop", "cleaner"]
});