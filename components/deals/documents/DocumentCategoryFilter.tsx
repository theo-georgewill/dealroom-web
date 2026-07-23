import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DocumentCategoryFilter() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="survey-plan">Survey Plan</SelectItem>
        <SelectItem value="title-document">Title Document</SelectItem>
        <SelectItem value="contract">Contract</SelectItem>
        <SelectItem value="receipt">Receipt</SelectItem>
      </SelectContent>
    </Select>
  );
}