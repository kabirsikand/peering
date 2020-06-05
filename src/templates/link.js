import handlebars from 'handlebars'

export default function(text, url) {
	return new handlebars.SafeString("<a href='" + handlebars.escapeExpression(url) + "'>" + handlebars.escapeExpression(text) + "</a>");
}