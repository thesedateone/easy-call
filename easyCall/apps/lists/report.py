from easyCall.apps.call_records.models import CallRecord, QueueEntry


class TypeReport:

    """Retrieve record counts to provide to the report serializer."""

    def __init__(self, list_type):
        self.call_record_set = CallRecord.objects.filter(list_type=list_type)
        self.list_type = list_type
        self.new_qs = self.call_record_set.filter(status=CallRecord.NEW)
        self.in_progress_qs = self.call_record_set.filter(status=CallRecord.IN_PROGRESS)
        self.completed_qs = self.call_record_set.filter(status=CallRecord.COMPLETE)
        self.dequeued_qs = self.call_record_set.filter(status=CallRecord.DEQUEUED)
        self.queue_entry_qs = QueueEntry.objects.filter(list_type=list_type)

    def slug(self):
        return self.list_type

    def completed(self):
        return self.completed_qs.filter(exported__isnull=True).count()

    def dequeued(self):
        return self.dequeued_qs.filter(exported__isnull=True).count()

    def inprogress(self):
        return self.in_progress_qs.count()

    def new(self):
        return self.new_qs.count()

    def queued(self):
        return self.queue_entry_qs.count()