import type { Enquiry } from '../types';

// Helper to generate a set of enquiries
const reasons = [
  'Customer traded in before bonus period end',
  'VIN not appearing on bonus report',
  'Delivery delay beyond retailer control',
  'Customer changed finance product post-order',
  'Fleet order incorrectly classified as retail',
  'Bonus period overlap on part-exchange vehicle',
  'Demo vehicle incorrectly excluded from bonus',
  'System error on handover date recording',
  'Customer cancellation and re-order within period',
  'Motability conversion not reflected in bonus',
  'Registration date mismatch with order date',
  'Pre-registered vehicle bonus eligibility query',
  'Catch-back applied despite meeting quarterly target',
  'Tactical bonus not applied to qualifying order',
  'Volume bonus threshold calculation discrepancy',
  'Multi-franchise order attribution incorrect',
  'Factory delay impacting bonus qualification',
  'Fleet customer reclassified mid-quarter',
  'Bonus clawback on cancelled finance agreement',
  'Test drive vehicle bonus eligibility dispute',
];

const descriptions = [
  'The customer originally placed an order during Q3 2025 but due to factory production delays the vehicle was not delivered until Q4. The retailer believes the bonus should be attributed to Q3 when the order was confirmed.',
  'Two VINs from a fleet order of 5 vehicles are not showing on the monthly bonus report. All vehicles were delivered on the same date and have confirmed finance agreements.',
  'Customer agreed a deal including margin support but subsequently changed from PCP to HP after the order was submitted. The system has removed the margin qualification.',
  'This vehicle was part of a demo fleet and was sold within the qualifying period. However it has been excluded from the bonus calculation as a demo disposal rather than a retail sale.',
  'The handover date in the system shows 3rd October but the actual handover documentation confirms 28th September. This places the vehicle in a different bonus period.',
  'A fleet order for 12 vehicles was split across two dealers in the group. The bonus has only been applied to one dealer code instead of being split proportionally.',
  'Customer cancelled their original order due to specification changes and placed a new order the following week. The system is treating this as two separate transactions.',
  'Three vehicles from a Motability order have not been included in the quarterly bonus calculation despite having confirmed registration dates within the period.',
  'The catch-back deduction has been applied to our Q4 figures despite meeting the revised quarterly target that was agreed with our Area Manager in October.',
  'A tactical bonus campaign was running during February but two qualifying deliveries from 27th and 28th February have not received the tactical uplift.',
];

function genVIN(index: number, brand: string): string {
  const prefixes: Record<string, string> = {
    VWPC: 'WVWZZZ',
    VWCV: 'WV1ZZZ',
    SEAT: 'VSSZZZ',
    CUPRA: 'VSSZZZ',
    SKODA: 'TMBZZZ',
    AUDI: 'WAUZZZ',
  };
  const prefix = prefixes[brand] || 'WVWZZZ';
  const mid = '3CZ';
  const suffix = String(100000 + index).slice(-6);
  return `${prefix}${mid}WE${suffix}`;
}

const models: Record<string, string[]> = {
  VWPC: ['Golf', 'Tiguan', 'T-Roc', 'Polo', 'ID.3', 'ID.4', 'ID.5', 'Passat', 'Arteon', 'Touareg', 'T-Cross', 'ID.7'],
  VWCV: ['Transporter', 'Caddy', 'Crafter', 'Amarok', 'ID. Buzz', 'California'],
  SEAT: ['Ibiza', 'Arona', 'Leon', 'Ateca', 'Tarraco'],
  CUPRA: ['Born', 'Formentor', 'Leon', 'Ateca', 'Tavascan'],
  SKODA: ['Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq', 'Fabia', 'Scala'],
  AUDI: ['A3', 'A4', 'A5', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'Q4 e-tron', 'A6', 'A1'],
};

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString();
}

function generateEnquiries(): Enquiry[] {
  const statuses: Enquiry['status'][] = ['Draft', 'Open', 'In Review', 'Closed', 'Appealed'];
  const businessAreas: Enquiry['business_area'][] = ['Retail', 'Fleet', 'Direct'];
  const bonusTypes: Enquiry['bonus_type'][] = ['Margin', 'Catch-Back', 'Tactical'];

  const retailerMap = [
    { id: 'ret-001', name: 'Volkswagen Milton Keynes', code: 'RET001', brand: 'VWPC' },
    { id: 'ret-002', name: 'Volkswagen Watford', code: 'RET002', brand: 'VWPC' },
    { id: 'ret-003', name: 'Volkswagen Leeds', code: 'RET003', brand: 'VWPC' },
    { id: 'ret-004', name: 'Volkswagen Birmingham', code: 'RET004', brand: 'VWPC' },
    { id: 'ret-005', name: 'Volkswagen Bristol', code: 'RET005', brand: 'VWPC' },
    { id: 'ret-006', name: 'Volkswagen Manchester', code: 'RET006', brand: 'VWPC' },
    { id: 'ret-011', name: 'VW Van Centre London', code: 'RET011', brand: 'VWCV' },
    { id: 'ret-012', name: 'VW Van Centre Reading', code: 'RET012', brand: 'VWCV' },
    { id: 'ret-013', name: 'VW Van Centre Nottingham', code: 'RET013', brand: 'VWCV' },
    { id: 'ret-015', name: 'SEAT Maidstone', code: 'RET015', brand: 'SEAT' },
    { id: 'ret-016', name: 'SEAT Bolton', code: 'RET016', brand: 'SEAT' },
    { id: 'ret-017', name: 'SEAT Coventry', code: 'RET017', brand: 'SEAT' },
    { id: 'ret-020', name: 'CUPRA London City', code: 'RET020', brand: 'CUPRA' },
    { id: 'ret-021', name: 'CUPRA Manchester', code: 'RET021', brand: 'CUPRA' },
    { id: 'ret-024', name: 'SKODA Cheltenham', code: 'RET024', brand: 'SKODA' },
    { id: 'ret-025', name: 'SKODA Sheffield', code: 'RET025', brand: 'SKODA' },
    { id: 'ret-026', name: 'SKODA Exeter', code: 'RET026', brand: 'SKODA' },
    { id: 'ret-027', name: 'SKODA Newcastle', code: 'RET027', brand: 'SKODA' },
    { id: 'ret-040', name: 'Volkswagen Stockport', code: 'RET040', brand: 'VWPC' },
    { id: 'ret-049', name: 'Volkswagen Croydon', code: 'RET049', brand: 'VWPC' },
  ];

  const userPool = [
    { id: 'usr-001', name: 'Sarah Mitchell' },
    { id: 'usr-002', name: 'James Harper' },
    { id: 'usr-009', name: 'Hannah Roberts' },
    { id: 'usr-012', name: 'Chris Davies' },
    { id: 'usr-015', name: 'Karen Stewart' },
  ];

  const assigneePool = [
    { id: 'usr-003', name: 'Emily Chen' },
    { id: 'usr-004', name: 'Richard Thompson' },
    { id: 'usr-005', name: 'Alexandra Foster' },
    { id: 'usr-007', name: 'Priya Patel' },
    { id: 'usr-011', name: 'Lisa Turner' },
    { id: 'usr-013', name: 'Natalie Wright' },
    { id: 'usr-014', name: 'Andrew Grant' },
  ];

  const enquiries: Enquiry[] = [];

  for (let i = 0; i < 105; i++) {
    const status = statuses[i % statuses.length];
    const retailer = retailerMap[i % retailerMap.length];
    const brand = retailer.brand as Enquiry['brand'];
    const creator = userPool[i % userPool.length];
    const assignee = status !== 'Draft' ? assigneePool[i % assigneePool.length] : undefined;
    const createdDate = randomDate(new Date('2025-04-01'), new Date('2026-02-28'));
    const updatedDate = randomDate(new Date(createdDate), new Date('2026-03-01'));
    const numVins = 2 + (i % 4);
    const brandModels = models[brand] || models.VWPC;

    const vins = Array.from({ length: numVins }, (_, vi) => ({
      vin: genVIN(i * 10 + vi, brand),
      model: brandModels[(i + vi) % brandModels.length],
      variant: ['SE', 'SEL', 'R-Line', 'Style', 'Xcellence', 'S line', 'FR', 'Monte Carlo', 'VZ'][vi % 9],
      registration_number: `${['AB', 'CD', 'EF', 'GH', 'KL', 'MN', 'PQ', 'RS'][vi % 8]}${25 + (i % 2)} ${['ABC', 'DEF', 'GHJ', 'KLM', 'NPR'][vi % 5]}`,
      handover_date: randomDate(new Date('2025-03-01'), new Date('2026-02-15')),
      bonus_period: `Q${1 + (i % 4)} 2025`,
      bonus_amount: 250 + (i * 50) % 2000,
      customer_name: ['John Smith', 'Emma Wilson', 'David Brown', 'Sophie Taylor', 'Mark Jones', 'Lucy White', 'Paul Green', 'Katie Harris', 'Tom Baker', 'Rachel Clark'][vi % 10],
      order_type: (['Retail', 'Fleet', 'Motability', 'Direct'] as const)[(i + vi) % 4],
    }));

    const comments = status !== 'Draft' ? [
      {
        id: `cmt-${i}-1`,
        author_id: creator.id,
        author_name: creator.name,
        content: `Submitting this enquiry regarding ${reasons[i % reasons.length].toLowerCase()}. Please review the attached documentation.`,
        created_date: createdDate,
        is_internal: false,
      },
      ...(status !== 'Open' ? [{
        id: `cmt-${i}-2`,
        author_id: assignee?.id || 'usr-005',
        author_name: assignee?.name || 'Alexandra Foster',
        content: 'Thank you for submitting this enquiry. I have reviewed the details and the supporting documentation. Will provide a full assessment shortly.',
        created_date: randomDate(new Date(createdDate), new Date(updatedDate)),
        is_internal: false,
      }] : []),
      ...(status === 'Closed' || status === 'Appealed' ? [{
        id: `cmt-${i}-3`,
        author_id: assignee?.id || 'usr-005',
        author_name: assignee?.name || 'Alexandra Foster',
        content: status === 'Closed'
          ? 'After thorough review, this enquiry has been resolved. The bonus adjustment has been applied to the next payment run.'
          : 'The retailer has submitted an appeal against the original decision. This has been escalated for further review.',
        created_date: updatedDate,
        is_internal: false,
      }] : []),
    ] : [];

    enquiries.push({
      id: `enq-${String(i + 1).padStart(3, '0')}`,
      enquiry_id: `ENQ-2025-${String(1000 + i).slice(-4)}`,
      status,
      brand,
      business_area: businessAreas[i % businessAreas.length],
      bonus_type: bonusTypes[i % bonusTypes.length],
      reason: reasons[i % reasons.length],
      description: descriptions[i % descriptions.length],
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      created_by: creator.id,
      created_by_name: creator.name,
      assigned_to: assignee?.id,
      assigned_to_name: assignee?.name,
      created_date: createdDate,
      updated_date: updatedDate,
      closed_date: status === 'Closed' ? updatedDate : undefined,
      vins,
      comments,
      attachments: i % 5 === 0 ? [
        {
          id: `att-${i}-1`,
          filename: 'supporting_evidence.pdf',
          file_type: 'application/pdf',
          file_size: 245000 + i * 1000,
          uploaded_by: creator.id,
          uploaded_date: createdDate,
          url: `/attachments/enq-${i}/supporting_evidence.pdf`,
        },
      ] : [],
      escalated_to_exception: i % 12 === 0 ? `exc-${String(Math.floor(i / 12) + 1).padStart(3, '0')}` : undefined,
      appeal_reason: status === 'Appealed' ? 'We believe the original decision did not account for the factory production delay documentation provided. Requesting re-assessment with updated evidence.' : undefined,
      resolution_notes: status === 'Closed' ? 'Bonus adjustment confirmed and applied. Payment will be included in next monthly settlement.' : undefined,
    });
  }

  return enquiries;
}

export const enquiries: Enquiry[] = generateEnquiries();
