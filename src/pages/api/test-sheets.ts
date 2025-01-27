import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, phoneNumber, collectiveStrength, age, paymentStatus } = req.body;

      const spreadsheetId = process.env.SHEET_ID; // Your spreadsheet ID from environment variable
      const range = process.env.RANGE; // Use the range from environment variable

      // Log the values to check if they are set
      console.log('Spreadsheet ID:', spreadsheetId);
      console.log('Range:', range);

      if (!spreadsheetId || !range) {
        throw new Error('SHEET_ID or RANGE is not set in the environment variables.');
      }

      if (!name || !phoneNumber || !collectiveStrength || !age || !paymentStatus) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Decode the Google Application Credentials
      const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
      if (!credentialsBase64) {
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS_BASE64 is not set in the environment variables.');
      }
      const credentialsJson = Buffer.from(credentialsBase64, 'base64').toString('utf8');
      const credentials = JSON.parse(credentialsJson);

      // Authenticate using the credentials
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const authClient = await auth.getClient() as JWT;

      const sheets = google.sheets({ version: 'v4', auth: authClient });

      const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values: [[name, phoneNumber, collectiveStrength, age, paymentStatus]],
        },
        auth: authClient,
      };

      // Append data to Google Sheets
      const response = await sheets.spreadsheets.values.append(request);

      console.log('Google Sheets Response:', response.data);
      console.log('SHEET_ID:', process.env.SHEET_ID);
      console.log('RANGE:', process.env.RANGE);
      
      res.status(200).json({
        message: 'Data added successfully',
        data: response.data,
      });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({
        message: 'Error adding data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
