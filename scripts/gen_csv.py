import csv
import argparse
from datetime import date
from random import randrange

from faker import Factory
from dateutil.relativedelta import relativedelta


TYPES = {
    'badcc': 'import_badcc.csv',
    'nice': 'import_nice.csv',
    'street': 'import_street.csv',
}

BADCC_FIELDNAMES = [
    'Serial No',
    'Title', 'First Name', 'Last Name',
    'Tel (day)', 'Tel (eve)', 'Mobile',
    'Address 1', 'Suburb', 'Town/City', 'Postcode',
    'Do Not Mail Reason', 'Date of Birth', 'Age',
    'Frequency', 'Start Date', 'Instalment Due',
    'Instalment', 'Pledge ID', 'Card Type', 'Card Name',
    '#Missed-Sept-Dec', '$Missed-Sept-Dec', '#Missed-2014',
    '$Missed-2014', 'Status', 'On List From', 'Other Group',
    'Last Called', 'Number of Times Called',
    'Note - Rapport', 'Note - Procedural']

NICE_FIELDNAMES = [
    'Serial No',
    'Title', 'First Name', 'Last Name',
    'Tel (day)', 'Tel (eve)', 'Mobile',
    'Address 1', 'Suburb', 'Town/City', 'Postcode',
    'Do Not Mail Reason', 'Date of Birth', 'Age',
    'Foo', 'Bar', 'Baz',
    'Note - Rapport', 'Note - Procedural', 'Note - Approach']

STREET_FIELDNAMES = [
    'Serial No',
    'Title', 'First Name', 'Last Name',
    'Tel (day)', 'Tel (eve)', 'Mobile',
    'Address 1', 'Suburb', 'Town/City', 'Postcode',
    'Do Not Mail Reason', 'Date of Birth', 'Age',
    'Foo', 'Bar', 'Baz', 'Note - Procedural']


def pick_field_names(data_type):
    if data_type == 'badcc':
        return BADCC_FIELDNAMES
    if data_type == 'nice':
        return NICE_FIELDNAMES
    if data_type == 'street':
        return STREET_FIELDNAMES


def pick_row_gen(data_type):
    if data_type == 'badcc':
        return gen_badcc_row
    if data_type == 'nice':
        return gen_nice_row
    if data_type == 'street':
        return gen_street_row


def gen_id():
    return "{0:08d}".format(randrange(1, 99999999))


def gen_post_code():
    return "{0:04d}".format(randrange(1, 9999))


def gen_dob():
    today = date.today()

    day = randrange(1, 29)
    month = randrange(1, 13)
    year = today.year
    years_ago = randrange(20, 85)

    start_date = date(year, month, day)
    dob = start_date - relativedelta(years=years_ago)

    age = relativedelta(today, dob).years

    return {'dob': dob, 'age': age}


def gen_badcc_row(fake):
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix(),
        'First Name': fake.first_name(),
        'Last Name': fake.last_name(),
        'Tel (day)': fake.phone_number(),
        'Tel (eve)': fake.phone_number(),
        'Mobile': fake.phone_number(),
        'Address 1': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Do Not Mail Reason': fake.sentence(),
        'Date of Birth': date_info['dob'],
        'Age': date_info['age'],
        'Frequency': fake.sentence(),
        'Start Date': fake.sentence(),
        'Instalment Due': fake.sentence(),
        'Instalment': fake.sentence(),
        'Pledge ID': fake.sentence(),
        'Card Type': fake.sentence(),
        'Card Name': fake.sentence(),
        '#Missed-Sept-Dec': fake.sentence(),
        '$Missed-Sept-Dec': fake.sentence(),
        '#Missed-2014': fake.sentence(),
        '$Missed-2014': fake.sentence(),
        'Status': fake.sentence(),
        'On List From': fake.sentence(),
        'Other Group': fake.sentence(),
        'Last Called': fake.sentence(),
        'Number of Times Called': fake.sentence(),
        'Note - Rapport': fake.sentence(),
        'Note - Procedural': fake.sentence()
    }


def gen_nice_row(fake):
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix(),
        'First Name': fake.first_name(),
        'Last Name': fake.last_name(),
        'Tel (day)': fake.phone_number(),
        'Tel (eve)': fake.phone_number(),
        'Mobile': fake.phone_number(),
        'Address 1': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Do Not Mail Reason': fake.sentence(),
        'Date of Birth': date_info['dob'],
        'Age': date_info['age'],
        'Foo': 'nice',
        'Bar': 'nice',
        'Baz': 'nice',
        'Note - Rapport': fake.sentence(),
        'Note - Procedural': fake.sentence(),
        'Note - Approach': fake.sentence()
    }


def gen_street_row(fake):
    date_info = gen_dob()
    return {
        'Serial No': gen_id(),
        'Title': fake.prefix(),
        'First Name': fake.first_name(),
        'Last Name': fake.last_name(),
        'Tel (day)': fake.phone_number(),
        'Tel (eve)': fake.phone_number(),
        'Mobile': fake.phone_number(),
        'Address 1': fake.street_address(),
        'Suburb': fake.city(),
        'Town/City': fake.city(),
        'Postcode': gen_post_code(),
        'Do Not Mail Reason': fake.sentence(),
        'Date of Birth': date_info['dob'],
        'Age': date_info['age'],
        'Foo': 'street',
        'Bar': 'street',
        'Baz': 'street',
        'Note - Procedural': fake.sentence(),
    }


if __name__ == '__main__':
    # Deal with command line params
    parser = argparse.ArgumentParser()
    parser.add_argument('--type', default='badcc',
                        choices=TYPES.keys(),
                        help='What type of data do you need?')
    parser.add_argument('--size', default=15, type=int,
                        help='How many rows of data do you need? (positive int)')
    args = parser.parse_args()

    # Set up based on desired type of data
    fake = Factory.create()
    fieldnames = pick_field_names(args.type)
    row_gen = pick_row_gen(args.type)
    filename = TYPES[args.type]

    # Write the data
    with open(filename, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, dialect='excel',
                                fieldnames=fieldnames,
                                delimiter=',', quotechar='"',
                                quoting=csv.QUOTE_ALL)
        writer.writeheader()
        for num in range(0, args.size):
            writer.writerow(row_gen(fake))


#   Faker methods that could come in handy later
#   fake.sentence()
#   fake.text()
