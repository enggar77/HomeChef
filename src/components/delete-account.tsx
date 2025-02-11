'use client';

import { deleteUserAccount } from '@/lib/actions';
import { useState } from 'react';

export default function DeleteAccount() {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteUserAccount();
		} catch (err) {
			console.error('Error:', err);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<div className="mx-auto max-w-[500px]">
				<button
					className="btn btn-sm btn-warning"
					disabled={isDeleting}
					onClick={() => {
						const modal = document.getElementById('my_modal_1');
						(modal as HTMLDialogElement)?.showModal();
					}}
				>
					Delete Account
				</button>
			</div>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<p>
						Are you sure want to delete your account? All data will
						be lost.
					</p>
					<div className="modal-action">
						<form method="dialog">
							<div className="flex gap-2">
								<button
									className="btn btn-neutral btn-sm"
									disabled={isDeleting}
								>
									Back
								</button>
								<button
									className="btn btn-warning btn-sm"
									onClick={handleDelete}
									disabled={isDeleting}
								>
									{isDeleting ? 'Deleting...' : 'Delete'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
