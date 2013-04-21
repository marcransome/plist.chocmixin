// Copyright (c) 2013 Marc Ransome <marc.ransome@fidgetbox.co.uk>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

var exec = require('child_process').exec;

function noError() {
	if (!Document.current()) {
		Alert.show('Doh!', 'Open a file and try again.', ['OK']);
		return false;
	}
	else if (!Document.current().path()) {
		Alert.show('Doh!', 'Save the current file and try again.', ['OK']);
		return false;
	}
	
	return true;
}

Hooks.addMenuItem('Actions/plist/Copy to clipboard as XML', 'cmd+shift+x', function () {
	if (!noError())
		return;
	var filePath = Document.current().path();
	exec('plutil -convert xml1 "' + filePath + '" -o - | pbcopy');
});

Hooks.addMenuItem('Actions/plist/Copy to clipboard as binary', 'cmd+shift+p', function () {
	if (!noError())
		return;
	var filePath = Document.current().path();
	exec('plutil -convert binary1 "' + filePath + '" -o - | pbcopy');
});

