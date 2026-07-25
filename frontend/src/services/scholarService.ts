import type { Scholar } from '../types/Scholars';

const API_BASE_URL = 'http://localhost:5000/api';

export const scholarService = {
    getApprovedScholars: async (): Promise<Scholar[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/scholars`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('📦 API Response:', data); // Debug log

            // The API returns { success: true, scholars: [...], total: 7 }
            if (data.success && data.scholars) {
                console.log(`✅ Found ${data.scholars.length} scholars`);
                return data.scholars;
            }

            throw new Error('Invalid response format');
        } catch (error) {
            console.error('❌ Error fetching scholars:', error);
            throw error;
        }
    },

    getScholarById: async (id: string): Promise<Scholar> => {
        try {
            const response = await fetch(`${API_BASE_URL}/scholars/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.scholar) {
                return data.scholar;
            }

            throw new Error('Invalid response format');
        } catch (error) {
            console.error('Error fetching scholar:', error);
            throw error;
        }
    }
};