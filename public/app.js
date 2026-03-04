document.addEventListener('DOMContentLoaded', async () => {
    const listElement = document.getElementById('recordings-list');
    const template = document.getElementById('card-template');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    try {
        const response = await fetch('/api/recordings');
        const recordings = await response.json();
        listElement.innerHTML = '';

        if (recordings.length === 0) {
            listElement.innerHTML = '<p style="text-align: center; padding: 40px; opacity: 0.5;">No recordings found.</p>';
            return;
        }

        recordings.forEach((rec, index) => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.card');
            card.style.animationDelay = `${index * 0.1}s`;
            clone.querySelector('.filename').textContent = rec.filename;
            clone.querySelector('.date').textContent = formatDate(rec.createdAt);
            clone.querySelector('.size').textContent = formatSize(rec.size);
            const audio = clone.querySelector('.audio-player');
            audio.querySelector('source').src = rec.url;
            const downloadBtn = clone.querySelector('.btn-download');
            downloadBtn.href = rec.url;

            const deleteBtn = clone.querySelector('.btn-delete');
            deleteBtn.addEventListener('click', async () => {
                if (confirm('この録音を削除してもよろしいですか？')) {
                    try {
                        const delRes = await fetch(`/api/recordings/${rec.sessionId}/${rec.filename}`, {
                            method: 'DELETE'
                        });
                        if (delRes.ok) {
                            window.location.reload();
                        } else {
                            alert('削除に失敗しました。');
                        }
                    } catch (e) {
                        console.error('Delete error:', e);
                        alert('エラーが発生しました。');
                    }
                }
            });

            listElement.appendChild(clone);
        });

    } catch (error) {
        console.error('Error loading recordings:', error);
        listElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #ff4757;">Failed to load recordings. Please try again later.</p>';
    }
});
