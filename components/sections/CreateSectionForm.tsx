"use client";

import { Course, Section } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import SectionList from "@/components/sections/SectionList";

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

const CreateSectionForm = ({ course }: { course: Course & {sections:Section[]}}) => {
  const pathname = usePathname();
  const router =useRouter();

  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course.id}/basic`,
    },
    { label: "Curriculam", path: `/instructor/courses/${course.id}/sections` },
  ];

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const response=await axios.post(`/api/courses/${course.id}/sections`,values)
        router.push(`/instructor/courses/${course.id}/sections/${response.data.id}`)
        toast.success("Section created successfully")

    } catch (err) {
      console.log("error in section",err);
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="px-6">
      <div className="flex gap-5">
        {routes.map((route) => {
          return (
            <Link key={route.path} href={route.path}>
              <Button variant={pathname === route.path ? "default" : "outline"}>
                {route.label}
              </Button>
            </Link>
          );
        })}
      </div>

        <SectionList items={course.sections || []} />


      <h1 className="text-xl font-bold mt-5">Add New Section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex : Introduction" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSectionForm;
