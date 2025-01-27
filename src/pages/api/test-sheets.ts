import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import path from 'path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets('v4');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, phoneNumber, collectiveStrength, age, paymentStatus } = req.body;

      // Authenticate using the service account
      const authClient = await auth.getClient();

      const spreadsheetId = '1v9aR6ILyaH7LvHegKdWpG7n-TJ3DcCRCTOQvnpioz4c'; // Your spreadsheet ID
      const range = 'Sheet1!A2:E'; // Use the appropriate range, assuming you're adding below row 1

      const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values: [[name, phoneNumber, collectiveStrength, age, paymentStatus]],
        },
        auth: authClient,
      };

      // Append data to the spreadsheet
      const response: any = await sheets.spreadsheets.values.append(request);

      // Log the response to inspect its structure
      console.log('Google Sheets Response:', response);

      // Return success response with the data
      res.status(200).json({
        message: 'Data added successfully',
        data: response.data, // Ensure you are correctly accessing the response data
      });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({
        message: 'Error adding data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' }); // Handle other HTTP methods
  }
};
