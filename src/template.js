export default body => 
`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<div id="app"><div>${body}</div></div>
<script src="/bundle.js"></script>
</body>
</html>`;