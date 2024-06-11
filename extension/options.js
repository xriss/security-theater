const saveOptions = function(){
	const hosts = document.getElementById('hosts').value;

	chrome.storage.sync.set(
		{ hosts: hosts },
		function(){
			// Update status to let user know options were saved.
			const status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(function(){
				status.textContent = '';
			}, 750);
		}
	);
};

const restoreOptions = function(){
	chrome.storage.sync.get(
		{ hosts:
`.*://.*\\.github.io
.*://localhost(:.*)?
.*://127\\.0\\.0\\.1(:.*)?
`
		},
		function(items){
			document.getElementById('hosts').value = items.hosts;
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

restoreOptions()
