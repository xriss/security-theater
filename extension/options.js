const saveOptions = function(){
	const sites = document.getElementById('sites').value;

	chrome.storage.sync.set(
		{ sites: sites },
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
		{ sites:
`.*://.*\\.github.io/.*
.*://localhost:.*/.*
.*://127\\.0\\.0\\.1:.*/.*
`
		},
		function(items){
			document.getElementById('sites').value = items.sites;
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

restoreOptions()
